import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Coins, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface BalanceCardProps {
  balance: number;
  label?: string;
}

export default function BalanceCard({ balance, label = "Mining Balance" }: BalanceCardProps) {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const prevBalanceRef = useRef(balance);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    if (balance !== prevBalanceRef.current) {
      setIsIncreasing(balance > prevBalanceRef.current);
      
      const diff = balance - displayBalance;
      const steps = 20;
      const increment = diff / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setDisplayBalance(prev => {
          if (currentStep >= steps) {
            clearInterval(interval);
            return balance;
          }
          return prev + increment;
        });
      }, 50);

      prevBalanceRef.current = balance;
      
      setTimeout(() => setIsIncreasing(false), 1000);

      return () => clearInterval(interval);
    }
  }, [balance]);

  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80 border-primary/20 shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none animate-gradient-shift" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          {isIncreasing && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <TrendingUp className="w-4 h-4 text-green-500" />
            </motion.div>
          )}
        </div>
        <div className="flex items-center justify-center gap-3 mb-2">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: isIncreasing ? [1, 1.2, 1] : 1
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity },
              scale: { duration: 0.5 }
            }}
          >
            <Coins className="w-8 h-8 text-primary animate-glow drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
          </motion.div>
          <motion.div
            key={Math.floor(balance)}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-5xl md:text-6xl font-mono font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
            data-testid="text-balance"
          >
            {displayBalance.toFixed(2)}
          </motion.div>
        </div>
        <p className="text-xs text-muted-foreground font-medium">PingCaset Coins</p>
      </div>
    </Card>
  );
}
