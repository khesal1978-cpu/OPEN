import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MiningButtonProps {
  isMining: boolean;
  onToggle: () => void;
}

export default function MiningButton({ isMining, onToggle }: MiningButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        animate={isMining ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Button
          size="icon"
          variant="default"
          onClick={onToggle}
          data-testid="button-mine"
          className={`w-32 h-32 md:w-40 md:h-40 rounded-full relative overflow-visible ${
            isMining ? "animate-pulse-glow" : ""
          }`}
        >
          {isMining && (
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-30"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <Zap className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" />
        </Button>
      </motion.div>
      
      <p className="text-sm text-muted-foreground">
        {isMining ? "Tap to stop mining" : "Tap to start mining"}
      </p>
    </div>
  );
}
