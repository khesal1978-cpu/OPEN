import LeaderboardRow from "../LeaderboardRow";

export default function LeaderboardRowExample() {
  return (
    <div className="p-6 bg-background space-y-2">
      <LeaderboardRow rank={1} name="Alex Thompson" amount={5420.50} />
      <LeaderboardRow rank={2} name="Emma Davis" amount={4890.25} />
      <LeaderboardRow rank={3} name="Chris Lee" amount={4230.75} />
      <LeaderboardRow rank={4} name="You" amount={3847.20} isCurrentUser />
      <LeaderboardRow rank={5} name="Jordan Miller" amount={3512.90} />
    </div>
  );
}
