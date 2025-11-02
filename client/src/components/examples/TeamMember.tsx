import TeamMember from "../TeamMember";

export default function TeamMemberExample() {
  return (
    <div className="p-6 bg-background space-y-3">
      <TeamMember name="Sarah Johnson" level={2} mined={342.5} referrals={5} />
      <TeamMember name="Mike Chen" level={1} mined={128.75} referrals={2} />
    </div>
  );
}
