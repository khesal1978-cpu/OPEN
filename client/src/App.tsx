import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import SplashScreen from "@/components/SplashScreen";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import Team from "@/pages/Team";
import Leaderboard from "@/pages/Leaderboard";
import Wallet from "@/pages/Wallet";
import Profile from "@/pages/Profile";
import BottomNav from "@/components/BottomNav";
import { createUserProfile } from "@/services/userService";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/team" component={Team} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/profile" component={Profile} />
      </Switch>
      <BottomNav />
    </>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useRealtimeProfile(user?.uid);

  useEffect(() => {
    async function initializeUser() {
      if (user && !profileLoading) {
        if (!profile) {
          const displayName = user.displayName || user.email?.split('@')[0] || "User";
          await createUserProfile(user.uid, user.email!, displayName);
        }
        
        const hasSeenTutorial = localStorage.getItem(`tutorial_${user.uid}`);
        if (!hasSeenTutorial && profile) {
          setShowTutorial(true);
        }
      }
      setInitializing(false);
    }

    if (!loading) {
      initializeUser();
    }
  }, [user, loading, profile, profileLoading]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    if (user) {
      localStorage.setItem(`tutorial_${user.uid}`, "true");
    }
  };

  const tutorialSteps = [
    {
      title: "Welcome to PingCaset!",
      description: "Start mining coins with just a tap. The more you mine, the more you earn!",
    },
    {
      title: "Build Your Team",
      description: "Invite friends using your referral code and earn bonus mining speed for every member.",
    },
    {
      title: "Track Your Progress",
      description: "Check the leaderboard to see how you rank among other miners worldwide.",
    },
    {
      title: "Manage Your Earnings",
      description: "View your wallet to track your balance and transaction history.",
    },
  ];

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (loading || (user && initializing)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full absolute inset-0" />
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Initializing PingCaset
          </h3>
          <p className="text-sm text-muted-foreground">Setting up your mining dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <>
      <Router />
      {showTutorial && (
        <OnboardingTutorial steps={tutorialSteps} onComplete={handleTutorialComplete} />
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
