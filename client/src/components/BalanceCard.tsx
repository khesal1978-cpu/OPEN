import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Coins } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  label?: string;
}

export default function BalanceCard({ balance, label = "Mining Balance" }: BalanceCardProps) {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80 border-primary/20 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="text-center relative z-10">
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Coins className="w-8 h-8 text-primary animate-glow" />
          </motion.div>
          <motion.div
            key={balance}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-mono font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent"
            data-testid="text-balance"
          >
            {balance.toFixed(2)}
          </motion.div>
        </div>
        <p className="text-xs text-muted-foreground">PingCaset Coins</p>
      </div>
    </Card>
  );
}
