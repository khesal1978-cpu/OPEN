import { Home, Users, Trophy, Wallet, User } from "lucide-react";
import { Link, useLocation } from "wouter";

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Mine", path: "/" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: Trophy, label: "Ranks", path: "/leaderboard" },
  { icon: Wallet, label: "Wallet", path: "/wallet" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border z-40">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex-1"
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <div
                className={`flex flex-col items-center gap-1 py-2 rounded-lg hover-elevate ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "fill-current" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
