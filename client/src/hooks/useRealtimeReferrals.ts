import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Referral } from "@shared/types";

export function useRealtimeReferrals(uid: string | undefined) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "referrals"),
      where("referrerUid", "==", uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const refs = snapshot.docs.map((doc) => doc.data() as Referral);
      setReferrals(refs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [uid]);

  return { referrals, loading };
}
