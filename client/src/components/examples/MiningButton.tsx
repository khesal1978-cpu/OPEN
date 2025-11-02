import { useState } from "react";
import MiningButton from "../MiningButton";

export default function MiningButtonExample() {
  const [isMining, setIsMining] = useState(false);
  
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-background">
      <MiningButton 
        isMining={isMining} 
        onToggle={() => setIsMining(!isMining)} 
      />
    </div>
  );
}
