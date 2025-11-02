import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Referral } from "@shared/types";

export async function getUserReferrals(uid: string): Promise<Referral[]> {
  const q = query(
    collection(db, "referrals"),
    where("referrerUid", "==", uid)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Referral);
}

export async function getReferralStats(uid: string) {
  const referrals = await getUserReferrals(uid);
  const totalReferrals = referrals.length;
  const totalTeamEarnings = referrals.reduce((sum, ref) => sum + ref.totalMined, 0);

  return {
    totalReferrals,
    totalTeamEarnings,
    referrals,
  };
}

export async function findUserByReferralCode(code: string): Promise<string | null> {
  const q = query(
    collection(db, "users"),
    where("referralCode", "==", code)
  );

  const snapshot = await getDocs(q);
  return snapshot.empty ? null : snapshot.docs[0].id;
}
