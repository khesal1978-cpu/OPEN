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
    <Card className="p-4 hover-elevate">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
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
  );
}
