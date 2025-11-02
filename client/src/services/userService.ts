import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { UserProfile } from "@shared/types";

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PC";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createUserProfile(
  uid: string,
  email: string,
  username: string,
  referredBy?: string
): Promise<UserProfile> {
  const referralCode = generateReferralCode();
  const now = Date.now();
  const profile: UserProfile = {
    uid,
    email,
    username,
    referralCode,
    referredBy,
    createdAt: now,
    totalMined: 0,
    balance: 0,
    miningSpeed: 0.25,
    activeBoosts: [],
    dailyResetAt: now + 24 * 60 * 60 * 1000,
  };

  await setDoc(doc(db, "users", uid), profile);

  if (referredBy) {
    await setDoc(doc(db, "referrals", `${referredBy}_${uid}`), {
      referrerUid: referredBy,
      referredUid: uid,
      referredUsername: username,
      createdAt: now,
      level: 1,
      totalMined: 0,
    });
  }

  return profile;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
}

export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, updates as any);
}

export async function updateMiningBalance(
  uid: string,
  amount: number
): Promise<void> {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    balance: increment(amount),
    totalMined: increment(amount),
    lastMiningAt: Date.now(),
  });
  
  const userDoc = await getDoc(docRef);
  const userData = userDoc.data() as UserProfile;
  
  if (userData.referredBy) {
    const referralDocRef = doc(db, "referrals", `${userData.referredBy}_${uid}`);
    await updateDoc(referralDocRef, {
      totalMined: increment(amount),
    });
  }
}
