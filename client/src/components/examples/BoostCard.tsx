import { useState } from "react";
import BoostCard from "../BoostCard";
import { UserPlus, Share2, Zap } from "lucide-react";

export default function BoostCardExample() {
  const [active, setActive] = useState(false);

  return (
    <div className="p-6 bg-background space-y-3">
      <BoostCard
        title="Invite Friends"
        description="Get +20% mining speed for each referral"
        icon={UserPlus}
        boost="+20%"
        onActivate={() => setActive(!active)}
        isActive={active}
      />
      <BoostCard
        title="Social Share"
        description="Share on social media for daily boost"
        icon={Share2}
        boost="+10%"
        onActivate={() => console.log("Share activated")}
      />
      <BoostCard
        title="Daily Streak"
        description="Mine daily to unlock bonus multiplier"
        icon={Zap}
        boost="+50%"
        onActivate={() => console.log("Streak activated")}
      />
    </div>
  );
}
