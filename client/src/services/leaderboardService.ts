import { collection, query, orderBy, limit, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { LeaderboardEntry } from "@shared/types";

export async function getGlobalLeaderboard(
  limitCount: number = 100
): Promise<LeaderboardEntry[]> {
  const q = query(
    collection(db, "users"),
    orderBy("totalMined", "desc"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc, index) => {
    const data = doc.data();
    return {
      uid: doc.id,
      username: data.username,
      totalMined: data.totalMined,
      rank: index + 1,
      country: data.country,
    };
  });
}

export async function getRegionalLeaderboard(
  country: string,
  limitCount: number = 50
): Promise<LeaderboardEntry[]> {
  const q = query(
    collection(db, "users"),
    where("country", "==", country),
    orderBy("totalMined", "desc"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc, index) => {
    const data = doc.data();
    return {
      uid: doc.id,
      username: data.username,
      totalMined: data.totalMined,
      rank: index + 1,
      country: data.country,
    };
  });
}

export async function getUserRank(uid: string): Promise<number> {
  const allUsers = await getGlobalLeaderboard(1000);
  const userIndex = allUsers.findIndex((entry) => entry.uid === uid);
  return userIndex >= 0 ? userIndex + 1 : -1;
}
