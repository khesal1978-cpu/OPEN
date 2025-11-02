import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MiningSession, Transaction } from "@shared/types";
import { updateMiningBalance } from "./userService";

export async function startMiningSession(
  uid: string,
  miningSpeed: number
): Promise<string> {
  const session: Omit<MiningSession, "id"> = {
    uid,
    startedAt: Date.now(),
    coinsEarned: 0,
    miningSpeed,
  };

  const docRef = await addDoc(collection(db, "miningSessions"), session);
  return docRef.id;
}

export async function stopMiningSession(
  sessionId: string,
  coinsEarned: number
): Promise<void> {
  const session = await getDocs(
    query(collection(db, "miningSessions"), where("__name__", "==", sessionId))
  );

  if (!session.empty) {
    const sessionData = session.docs[0].data() as MiningSession;
    await updateMiningBalance(sessionData.uid, coinsEarned);
    
    await addDoc(collection(db, "transactions"), {
      uid: sessionData.uid,
      type: "mining",
      amount: coinsEarned,
      description: "Mining Reward",
      createdAt: Date.now(),
    });
  }
}

export async function getUserTransactions(
  uid: string,
  limitCount: number = 20
): Promise<Transaction[]> {
  const q = query(
    collection(db, "transactions"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Transaction));
}

export async function addBonusTransaction(
  uid: string,
  amount: number,
  description: string
): Promise<void> {
  await addDoc(collection(db, "transactions"), {
    uid,
    type: "bonus",
    amount,
    description,
    createdAt: Date.now(),
  });

  await updateMiningBalance(uid, amount);
}
