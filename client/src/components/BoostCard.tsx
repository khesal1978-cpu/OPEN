import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

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
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`p-4 hover-elevate transition-all duration-300 ${
        isActive 
          ? "border-primary bg-gradient-to-r from-primary/10 via-purple-500/5 to-transparent shadow-lg" 
          : "backdrop-blur-sm bg-card/80"
      }`}>
        <div className="flex items-start gap-3 mb-3">
          <motion.div 
            className={`p-2 rounded-lg ${isActive ? "bg-primary/10" : "bg-muted"}`}
            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{title}</h3>
              <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                {boost}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button
          variant={isActive ? "secondary" : "default"}
          size="sm"
          className="w-full"
          onClick={onActivate}
          data-testid={`button-boost-${title.toLowerCase().replace(/\s/g, "-")}`}
        >
          {isActive ? "Active" : "Activate"}
        </Button>
      </Card>
    </motion.div>
  );
}
