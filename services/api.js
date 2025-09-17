// services/api.ts
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL ?? "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

// ✅ fetch medicines
export const fetchMedicines = async (search: string) => {
  const res = await api.get(`/api/medicines?search=${search}`);
  return res.data;
};

// ✅ fetch medicines by distributor (with optional search + log)
export const fetchDistributorMedicines = async (distributorId: string, search?: string) => {
  const url =
    search && search.length >= 3
      ? `/api/distributors/${distributorId}/medicines?search=${search}`
      : `/api/distributors/${distributorId}/medicines`;

  console.log("📡 API CALL:", url);
  const res = await api.get(url);
  return res.data;
};

// ✅ place order
export const placeOrder = async (orderData: any) => {
  const res = await api.post(`/api/orders`, orderData);
  return res.data;
};

// ✅ fetch my orders
export const getMyOrders = async (retailerId: string) => {
  const res = await api.get(`/api/orders/retailer/${retailerId}`);
  return res.data;
};

export default api;
