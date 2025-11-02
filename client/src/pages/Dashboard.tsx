import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import BalanceCard from "@/components/BalanceCard";
import MiningButton from "@/components/MiningButton";
import MiningStats, { Timer, TrendingUp, Clock, Calendar } from "@/components/MiningStats";
import BoostCard from "@/components/BoostCard";
import ParticleBackground from "@/components/ParticleBackground";
import { UserPlus, Share2, Zap } from "lucide-react";
import { updateUserProfile, updateMiningBalance } from "@/services/userService";
import { startMiningSession, stopMiningSession } from "@/services/miningService";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { profile, loading: profileLoading } = useRealtimeProfile(user?.uid);
  const [isMining, setIsMining] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalMined, setTotalMined] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const miningIntervalRef = useRef<NodeJS.Timeout>();
  const sessionStartRef = useRef<number>(0);
  const unsavedEarningsRef = useRef<number>(0);

  useEffect(() => {
    if (profile) {
      setBalance(profile.balance);
      setTotalMined(profile.totalMined);
      
      const now = Date.now();
      if (user && now > profile.dailyResetAt) {
        updateUserProfile(user.uid, {
          dailyResetAt: now + 24 * 60 * 60 * 1000,
        });
      }
    }
  }, [profile, user]);

  useEffect(() => {
    if (user && profile) {
      const pendingKey = `pending_earnings_${user.uid}`;
      const pendingEarnings = localStorage.getItem(pendingKey);
      
      if (pendingEarnings) {
        const amount = parseFloat(pendingEarnings);
        if (amount > 0) {
          updateMiningBalance(user.uid, amount);
          localStorage.removeItem(pendingKey);
        }
      }
    }
  }, [user, profile]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (unsavedEarningsRef.current > 0 && user) {
        const pendingKey = `pending_earnings_${user.uid}`;
        localStorage.setItem(pendingKey, unsavedEarningsRef.current.toString());
        
        updateMiningBalance(user.uid, unsavedEarningsRef.current);
        unsavedEarningsRef.current = 0;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user]);

  useEffect(() => {
    if (isMining && profile && user) {
      if (sessionStartRef.current === 0) {
        sessionStartRef.current = Date.now();
      }
      
      const miningSpeed = profile.miningSpeed;
      const coinsPerSecond = miningSpeed / 3600;
      
      if (miningIntervalRef.current) {
        clearInterval(miningIntervalRef.current);
      }
      
      miningIntervalRef.current = setInterval(() => {
        setBalance((prev) => prev + coinsPerSecond);
        setTotalMined((prev) => prev + coinsPerSecond);
        setActiveTime(Math.floor((Date.now() - sessionStartRef.current) / 1000));
        
        unsavedEarningsRef.current += coinsPerSecond;
        
        if (unsavedEarningsRef.current >= coinsPerSecond * 30) {
          const amountToSave = unsavedEarningsRef.current;
          unsavedEarningsRef.current = 0;
          updateMiningBalance(user.uid, amountToSave);
        }
      }, 1000);
    } else {
      if (miningIntervalRef.current) {
        clearInterval(miningIntervalRef.current);
      }
    }

    return () => {
      if (miningIntervalRef.current) {
        clearInterval(miningIntervalRef.current);
      }
      
      if (unsavedEarningsRef.current > 0 && user) {
        const amountToSave = unsavedEarningsRef.current;
        unsavedEarningsRef.current = 0;
        updateMiningBalance(user.uid, amountToSave);
      }
    };
  }, [isMining, user, profile?.miningSpeed]);

  const handleMiningToggle = async () => {
    if (!user || !profile) return;

    if (!isMining) {
      const id = await startMiningSession(user.uid, profile.miningSpeed);
      setSessionId(id);
      setIsMining(true);
      sessionStartRef.current = Date.now();
      unsavedEarningsRef.current = 0;
    } else {
      if (unsavedEarningsRef.current > 0) {
        await updateMiningBalance(user.uid, unsavedEarningsRef.current);
        unsavedEarningsRef.current = 0;
      }
      
      if (sessionId) {
        const coinsEarned = balance - profile.balance;
        await stopMiningSession(sessionId, coinsEarned);
      }
      
      setIsMining(false);
      setSessionId(null);
      setActiveTime(0);
      sessionStartRef.current = 0;
    }
  };

  const handleBoostToggle = async (boostType: string, multiplier: number) => {
    if (!user || !profile) return;

    const isActive = profile.activeBoosts.includes(boostType);
    
    if (!isActive) {
      const newBoosts = [...profile.activeBoosts, boostType];
      const newSpeed = profile.miningSpeed * multiplier;
      
      await updateUserProfile(user.uid, {
        activeBoosts: newBoosts,
        miningSpeed: newSpeed,
      });
      
      toast({
        title: "Boost Activated!",
        description: `Your mining speed increased by ${((multiplier - 1) * 100).toFixed(0)}%`,
      });
    } else {
      const newBoosts = profile.activeBoosts.filter(b => b !== boostType);
      const newSpeed = profile.miningSpeed / multiplier;
      
      await updateUserProfile(user.uid, {
        activeBoosts: newBoosts,
        miningSpeed: newSpeed,
      });
      
      toast({
        title: "Boost Deactivated",
        description: "Mining speed returned to normal",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getTimeUntilReset = () => {
    if (!profile) return "24h 0m";
    const now = Date.now();
    const remaining = Math.max(0, profile.dailyResetAt - now);
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Mining Speed", value: profile.miningSpeed.toFixed(2), icon: TrendingUp, suffix: "PC/h" },
    { label: "Total Mined", value: totalMined.toFixed(2), icon: Timer, suffix: "PC" },
    { label: "Active Time", value: formatTime(activeTime), icon: Clock },
    { label: "Next Reset", value: getTimeUntilReset(), icon: Calendar },
  ];

  return (
    <div className="min-h-screen pb-20 bg-background relative overflow-hidden">
      <ParticleBackground />
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">PingCaset</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {profile.username}!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <BalanceCard balance={balance} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center py-6"
        >
          <MiningButton isMining={isMining} onToggle={handleMiningToggle} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <MiningStats stats={stats} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-foreground px-1">Mining Boosts</h2>
          <BoostCard
            title="Invite Friends"
            description="Get +20% mining speed for each referral"
            icon={UserPlus}
            boost="+20%"
            onActivate={() => handleBoostToggle("invite", 1.2)}
            isActive={profile.activeBoosts.includes("invite")}
          />
          <BoostCard
            title="Social Share"
            description="Share on social media for daily boost"
            icon={Share2}
            boost="+10%"
            onActivate={() => handleBoostToggle("share", 1.1)}
            isActive={profile.activeBoosts.includes("share")}
          />
          <BoostCard
            title="Daily Streak"
            description="Mine daily to unlock bonus multiplier"
            icon={Zap}
            boost="+50%"
            onActivate={() => handleBoostToggle("streak", 1.5)}
            isActive={profile.activeBoosts.includes("streak")}
          />
        </motion.div>
      </div>
    </div>
  );
}
