import ReferralCode from "../ReferralCode";
import { Toaster } from "@/components/ui/toaster";

export default function ReferralCodeExample() {
  return (
    <div className="p-6 bg-background">
      <ReferralCode code="PC7X9M2K" />
      <Toaster />
    </div>
  );
}
