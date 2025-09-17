// hooks/useMedicines.ts
import { useState, useEffect } from "react";
import api from "../services/api";

// 🔹 Medicine type (same as backend schema)
interface Medicine {
  id: string;
  name: string;
  brand: string;
  price: number;
}

export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        console.log("🔵 Fetching medicines from /api/medicines ...");
        const res = await api.get("/api/medicines");

        // ✅ Map backend response into typed object
        const data: Medicine[] = res.data.map((m: any) => ({
          id: m._id,
          name: m.name,
          brand: m.brand ?? "Unknown",
          price: m.price ?? 0,
        }));

        setMedicines(data);
      } catch (err) {
        console.error("❌ Failed to fetch medicines:", err);
        setMedicines([]); // fallback empty array
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  return { medicines, loading };
}
