import MiningStats, { Timer, TrendingUp, Clock, Calendar } from "../MiningStats";

export default function MiningStatsExample() {
  const stats = [
    { label: "Mining Speed", value: "0.25", icon: TrendingUp, suffix: "PC/h" },
    { label: "Total Mined", value: "142.50", icon: Timer, suffix: "PC" },
    { label: "Active Time", value: "2h 34m", icon: Clock },
    { label: "Next Reset", value: "21h 26m", icon: Calendar },
  ];

  return (
    <div className="p-6 bg-background">
      <MiningStats stats={stats} />
    </div>
  );
}
