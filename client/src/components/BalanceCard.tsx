import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Coins } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  label?: string;
}

export default function BalanceCard({ balance, label = "Mining Balance" }: BalanceCardProps) {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">{label}</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Coins className="w-8 h-8 text-primary" />
          <motion.div
            key={balance}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-mono font-bold text-foreground"
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
