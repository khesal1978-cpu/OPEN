import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface TeamMemberProps {
  name: string;
  level: number;
  mined: number;
  referrals: number;
}

export default function TeamMember({ name, level, mined, referrals }: TeamMemberProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="p-4 hover-elevate" data-testid={`member-${name.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground">Level {level}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          <Users className="w-3 h-3 mr-1" />
          {referrals}
        </Badge>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Total Mined:</span>
        <span className="font-mono font-semibold text-foreground">{mined.toFixed(2)} PC</span>
      </div>
    </Card>
  );
}
