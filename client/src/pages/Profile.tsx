import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Globe, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SiTelegram, SiDiscord } from "react-icons/si";
import { updateUserProfile } from "@/services/userService";
import { getUserRank } from "@/services/leaderboardService";
import { useRealtimeProfile } from "@/hooks/useRealtimeProfile";
import { useRealtimeReferrals } from "@/hooks/useRealtimeReferrals";

export default function Profile() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { profile, loading: profileLoading } = useRealtimeProfile(user?.uid);
  const { referrals } = useRealtimeReferrals(user?.uid);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [saving, setSaving] = useState(false);
  const [rank, setRank] = useState(0);

  const loading = profileLoading;
  const teamCount = referrals.length;

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setCountry(profile.country || "");
    }
  }, [profile]);

  useEffect(() => {
    async function fetchRank() {
      if (user) {
        const userRank = await getUserRank(user.uid);
        setRank(userRank);
      }
    }
    fetchRank();
  }, [user, profile?.totalMined]);

  const handleSave = async () => {
    if (!user || !profile) return;

    setSaving(true);
    try {
      await updateUserProfile(user.uid, {
        username,
        country: country || undefined,
      });

      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "See you next time!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-20 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-1">Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your account settings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-foreground">{username}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsEditing(!isEditing)}
                    data-testid="button-edit-profile"
                    disabled={saving}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  Member since {formatDate(profile.createdAt)}
                </p>
                {country && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{country}</span>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4 mb-4"
              >
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-testid="input-username"
                    disabled={saving}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    data-testid="input-country"
                    placeholder="Enter your country"
                    disabled={saving}
                  />
                </div>
                <Button
                  onClick={handleSave}
                  className="w-full"
                  data-testid="button-save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{profile.totalMined.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Total PC</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{teamCount}</p>
                <p className="text-xs text-muted-foreground">Team</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">
                  {rank > 0 ? `#${rank}` : "-"}
                </p>
                <p className="text-xs text-muted-foreground">Rank</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Community</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                data-testid="button-telegram"
                onClick={() =>
                  toast({
                    title: "Coming Soon",
                    description: "Telegram community will be available soon!",
                  })
                }
              >
                <SiTelegram className="w-5 h-5 mr-3 text-blue-500" />
                Join our Telegram
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                data-testid="button-discord"
                onClick={() =>
                  toast({
                    title: "Coming Soon",
                    description: "Discord community will be available soon!",
                  })
                }
              >
                <SiDiscord className="w-5 h-5 mr-3 text-indigo-500" />
                Join our Discord
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account</h3>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
