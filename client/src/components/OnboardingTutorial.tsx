import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  target?: string;
}

interface OnboardingTutorialProps {
  steps: TutorialStep[];
  onComplete: () => void;
}

export default function OnboardingTutorial({ steps, onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="fixed inset-x-0 bottom-0 p-6 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-card border border-card-border rounded-2xl p-6 shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">
                  {steps[currentStep].title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSkip} data-testid="button-skip-tutorial">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>

            <div className="flex gap-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSkip} className="flex-1" data-testid="button-skip">
                Skip
              </Button>
              <Button onClick={handleNext} className="flex-1" data-testid="button-next">
                {currentStep < steps.length - 1 ? "Next" : "Get Started"}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
