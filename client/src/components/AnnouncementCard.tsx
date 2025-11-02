import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone } from "lucide-react";

interface AnnouncementCardProps {
  title: string;
  content: string;
  timestamp: string;
  isNew?: boolean;
}

export default function AnnouncementCard({ title, content, timestamp, isNew }: AnnouncementCardProps) {
  return (
    <Card className="p-4 hover-elevate" data-testid="announcement-card">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Megaphone className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{title}</h3>
            {isNew && (
              <Badge variant="default" className="text-xs">
                New
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{content}</p>
          <p className="text-xs text-muted-foreground">{timestamp}</p>
        </div>
      </div>
    </Card>
  );
}
