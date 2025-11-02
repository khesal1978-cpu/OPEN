import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  amount: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardRow({ rank, name, amount, isCurrentUser }: LeaderboardRowProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-700" />;
    return null;
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg hover-elevate ${
        isCurrentUser ? "bg-primary/10 border border-primary/20" : ""
      }`}
      data-testid={`leaderboard-row-${rank}`}
    >
      <div className="w-8 text-center">
        {getRankIcon() || (
          <span className="text-lg font-bold text-muted-foreground">{rank}</span>
        )}
      </div>
      <Avatar className="w-10 h-10">
        <AvatarFallback className={isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className={`font-semibold truncate ${isCurrentUser ? "text-primary" : "text-foreground"}`}>
          {name}
        </p>
      </div>
      <div className="text-right">
        <p className="font-mono font-bold text-foreground">{amount.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">PC</p>
      </div>
      {isCurrentUser && (
        <Badge variant="default" className="ml-2">
          You
        </Badge>
      )}
    </div>
  );
}
