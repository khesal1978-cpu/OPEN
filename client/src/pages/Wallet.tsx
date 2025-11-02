import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionItem from "@/components/TransactionItem";
import { Coins, TrendingUp, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { useRealtimeTransactions } from "@/hooks/useRealtimeTransactions";

export default function Wallet() {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useRealtimeProfile(user?.uid);
  const { transactions, loading: transactionsLoading } = useRealtimeTransactions(user?.uid, 20);

  const loading = profileLoading || transactionsLoading;

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const getWeeklyEarnings = () => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyTxns = transactions.filter((t) => t.createdAt > weekAgo);
    return weeklyTxns.reduce((sum, t) => sum + t.amount, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading wallet...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const totalBalance = profile.balance;
  const pendingBalance = profile.balance * 0.1;
  const availableBalance = totalBalance - pendingBalance;
  const weeklyEarnings = getWeeklyEarnings();
  const weeklyChange = profile.totalMined > 0 ? (weeklyEarnings / profile.totalMined) * 100 : 0;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Wallet</h1>
          <p className="text-sm text-muted-foreground">Manage your earnings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-primary/20">
                <Coins className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-4xl font-mono font-bold text-foreground" data-testid="text-total-balance">
                  {totalBalance.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">PingCaset Coins</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Available</p>
                <p className="text-lg font-mono font-semibold text-foreground">
                  {availableBalance.toFixed(2)} PC
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pending</p>
                <p className="text-lg font-mono font-semibold text-muted-foreground">
                  {pendingBalance.toFixed(2)} PC
                </p>
              </div>
            </div>

            <Button
              variant="default"
              className="w-full"
              disabled
              data-testid="button-withdraw"
            >
              <Lock className="w-4 h-4 mr-2" />
              Withdraw (Coming Soon)
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-xl font-bold text-foreground">+{weeklyEarnings.toFixed(2)} PC</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                +{weeklyChange.toFixed(0)}%
              </Badge>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-lg font-semibold text-foreground px-1">Transaction History</h2>
          {transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.02 }}
                >
                  <TransactionItem
                    type={transaction.type === "mining" || transaction.type === "bonus" ? "credit" : "debit"}
                    description={transaction.description}
                    amount={transaction.amount}
                    timestamp={formatTimestamp(transaction.createdAt)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Coins className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-sm text-muted-foreground">
                Start mining to see your transaction history!
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
