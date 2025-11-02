import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import LeaderboardRow from "@/components/LeaderboardRow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { useRealtimeLeaderboard } from "@/hooks/useRealtimeLeaderboard";

export default function Leaderboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("global");
  const { profile } = useRealtimeProfile(user?.uid);
  const { leaders: globalLeaders, loading: globalLoading } = useRealtimeLeaderboard("global");
  const { leaders: regionalLeaders, loading: regionalLoading } = useRealtimeLeaderboard(
    "regional",
    profile?.country
  );

  const loading = activeTab === "global" ? globalLoading : regionalLoading;

  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const leaders = activeTab === "global" ? globalLeaders : regionalLeaders;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Leaderboard</h1>
          <p className="text-sm text-muted-foreground">See how you rank among other miners</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="global" data-testid="tab-global">Global</TabsTrigger>
              <TabsTrigger value="regional" data-testid="tab-regional">Regional</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="space-y-2 mt-4">
              {leaders.length > 0 ? (
                leaders.map((leader, index) => (
                  <motion.div
                    key={leader.uid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.02 }}
                  >
                    <LeaderboardRow
                      rank={leader.rank}
                      name={leader.username}
                      amount={leader.totalMined}
                      isCurrentUser={user?.uid === leader.uid}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No rankings available yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start mining to appear on the leaderboard!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
