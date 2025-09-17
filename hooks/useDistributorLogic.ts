// hooks/useDistributorLogic.ts
import { useState, useEffect } from "react";
import api from "../services/api";   // 👈 backend API service
import { Distributor } from "../constants/types";

export function useDistributorLogic() {
  const [stores, setStores] = useState<Distributor[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);

  // 🔹 TODO: replace with actual retailerId from login/auth
  const retailerId = "abc"; // temporary

  useEffect(() => {
    let mounted = true;

    const fetchDistributors = async () => {
      try {
        // ✅ fetch distributors from backend
        const res = await api.get(`/api/distributors`);
        const data: Distributor[] = res.data;

        if (mounted) setStores(data);
      } catch (err) {
        console.error("🔴 Failed to fetch distributors:", err);
        if (mounted) setStores([]);
      }
    };

    fetchDistributors();
    return () => {
      mounted = false;
    };
  }, [retailerId]);

  useEffect(() => {
    const found = stores.find((s) => s._id === selected || s.id === selected);
    if (found) setBalance(found.balance || 0);
  }, [selected, stores]);

  return { stores, selected, setSelected, balance, checked, setChecked };
}
