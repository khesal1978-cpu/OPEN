import OnboardingTutorial from "../OnboardingTutorial";

export default function OnboardingTutorialExample() {
  const steps = [
    {
      title: "Welcome to PingCaset!",
      description: "Start mining coins with just a tap. The more you mine, the more you earn!",
    },
    {
      title: "Build Your Team",
      description: "Invite friends using your referral code and earn bonus mining speed for every member.",
    },
    {
      title: "Track Your Progress",
      description: "Check the leaderboard to see how you rank among other miners worldwide.",
    },
  ];

  return (
    <OnboardingTutorial
      steps={steps}
      onComplete={() => console.log("Tutorial completed")}
    />
  );
}
