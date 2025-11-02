import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logoImage from "@assets/generated_images/PingCaset_app_logo_icon_e5425426.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <img src={logoImage} alt="PingCaset" className="w-24 h-24" />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">PingCaset</h1>
          <p className="text-muted-foreground">Mine Your Future</p>
        </div>
      </motion.div>

      <div className="absolute bottom-12 w-64">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Loading your mining dashboard...
        </p>
      </div>
    </div>
  );
}
