import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Transaction } from "@shared/types";

export function useRealtimeTransactions(uid: string | undefined, limitCount: number = 20) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "transactions"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txns = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Transaction));
      setTransactions(txns);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid, limitCount]);

  return { transactions, loading };
}
