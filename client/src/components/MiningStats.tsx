import { Card } from "@/components/ui/card";
import { Timer, TrendingUp, Clock, Calendar } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: any;
  suffix?: string;
}

interface MiningStatsProps {
  stats: Stat[];
}

export default function MiningStats({ stats }: MiningStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-4 hover-elevate"
          data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, "-")}`}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-lg font-mono font-semibold text-foreground truncate">
                {stat.value}
                {stat.suffix && (
                  <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>
                )}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export { Timer, TrendingUp, Clock, Calendar };
