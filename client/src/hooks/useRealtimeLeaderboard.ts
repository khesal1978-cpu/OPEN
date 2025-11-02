import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { LeaderboardEntry } from "@shared/types";

export function useRealtimeLeaderboard(type: "global" | "regional", country?: string) {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q;
    
    if (type === "global") {
      q = query(
        collection(db, "users"),
        orderBy("totalMined", "desc"),
        limit(100)
      );
    } else {
      if (!country) {
        setLoading(false);
        return;
      }
      q = query(
        collection(db, "users"),
        where("country", "==", country),
        orderBy("totalMined", "desc"),
        limit(50)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map((doc, index) => {
        const data = doc.data();
        return {
          uid: doc.id,
          username: data.username,
          totalMined: data.totalMined,
          rank: index + 1,
          country: data.country,
        };
      });
      setLeaders(entries);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [type, country]);

  return { leaders, loading };
}
