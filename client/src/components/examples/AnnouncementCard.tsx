import AnnouncementCard from "../AnnouncementCard";

export default function AnnouncementCardExample() {
  return (
    <div className="p-6 bg-background space-y-3">
      <AnnouncementCard
        title="New Mining Boost Available!"
        content="Activate the daily streak bonus to earn up to 50% more coins. Start your streak today!"
        timestamp="2 hours ago"
        isNew
      />
      <AnnouncementCard
        title="Leaderboard Season 2 Starting Soon"
        content="Get ready for Season 2! Top 100 miners will receive exclusive rewards and bonuses."
        timestamp="1 day ago"
      />
    </div>
  );
}
