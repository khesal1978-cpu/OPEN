export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  country?: string;
  referralCode: string;
  referredBy?: string;
  createdAt: number;
  lastMiningAt?: number;
  totalMined: number;
  balance: number;
  miningSpeed: number;
  activeBoosts: string[];
  dailyResetAt: number;
}

export interface MiningSession {
  uid: string;
  startedAt: number;
  stoppedAt?: number;
  coinsEarned: number;
  miningSpeed: number;
}

export interface Referral {
  referrerUid: string;
  referredUid: string;
  referredUsername: string;
  createdAt: number;
  level: number;
  totalMined: number;
}

export interface Transaction {
  id: string;
  uid: string;
  type: "mining" | "referral" | "bonus" | "withdrawal";
  amount: number;
  description: string;
  createdAt: number;
}

export interface LeaderboardEntry {
  uid: string;
  username: string;
  totalMined: number;
  rank: number;
  country?: string;
}
