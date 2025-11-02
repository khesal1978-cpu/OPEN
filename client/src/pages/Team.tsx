import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import ReferralCode from "@/components/ReferralCode";
import TeamMember from "@/components/TeamMember";
import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { useRealtimeReferrals } from "@/hooks/useRealtimeReferrals";

export default function Team() {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useRealtimeProfile(user?.uid);
  const { referrals, loading: referralsLoading } = useRealtimeReferrals(user?.uid);

  const loading = profileLoading || referralsLoading;
  const totalTeamEarnings = referrals.reduce((sum, ref) => sum + ref.totalMined, 0);

  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading team data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">My Team</h1>
          <p className="text-sm text-muted-foreground">Build your network and earn together</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {profile && <ReferralCode code={profile.referralCode} />}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Team Members</p>
                  <p className="text-2xl font-bold text-foreground" data-testid="text-team-count">
                    {referrals.length}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Team Earnings</p>
                <p className="text-xl font-mono font-bold text-primary">
                  {totalTeamEarnings.toFixed(2)} PC
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {referrals.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-lg font-semibold text-foreground px-1">Team Members</h2>
            {referrals.map((referral, index) => (
              <motion.div
                key={referral.referredUid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <TeamMember
                  name={referral.referredUsername}
                  level={referral.level}
                  mined={referral.totalMined}
                  referrals={0}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No team members yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share your referral code to build your team and earn bonus mining speed!
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
