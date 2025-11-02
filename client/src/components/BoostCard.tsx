import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Sparkles } from "lucide-react";

interface BoostCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  boost: string;
  onActivate: () => void;
  isActive?: boolean;
}

export default function BoostCard({
  title,
  description,
  icon: Icon,
  boost,
  onActivate,
  isActive,
}: BoostCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`p-4 hover-elevate transition-all duration-300 relative overflow-hidden ${
        isActive 
          ? "border-primary bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent shadow-lg shadow-primary/20" 
          : "backdrop-blur-sm bg-card/80 border-border/50"
      }`}>
        {isActive && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute top-2 right-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            </div>
          </>
        )}
        <div className="flex items-start gap-3 mb-3 relative z-10">
          <motion.div 
            className={`p-2 rounded-lg relative ${isActive ? "bg-primary/20 shadow-lg shadow-primary/30" : "bg-muted"}`}
            animate={isActive ? { 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 0px rgba(220, 38, 38, 0.3)',
                '0 0 20px rgba(220, 38, 38, 0.5)',
                '0 0 0px rgba(220, 38, 38, 0.3)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary drop-shadow-[0_0_4px_rgba(220,38,38,0.8)]" : "text-muted-foreground"}`} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                className={`text-xs ${isActive ? "animate-pulse-glow" : ""}`}
              >
                {boost}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button
          variant={isActive ? "secondary" : "default"}
          size="sm"
          className={`w-full relative z-10 ${isActive ? "shadow-md" : ""}`}
          onClick={onActivate}
          data-testid={`button-boost-${title.toLowerCase().replace(/\s/g, "-")}`}
        >
          {isActive ? "✓ Active" : "Activate"}
        </Button>
      </Card>
    </motion.div>
  );
}
