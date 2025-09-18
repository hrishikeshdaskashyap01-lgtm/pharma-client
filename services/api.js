// services/api.js
import axios from "axios";
import Constants from "expo-constants";

// 👇 Fallback bhi Render backend hai (localhost hata diya)
const API_URL =
  Constants.expoConfig?.extra?.API_URL ?? "https://pharma-backend-utqb.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

// ✅ fetch medicines
export const fetchMedicines = async (search) => {
  const res = await api.get(`/api/medicines?search=${search}`);
  return res.data;
};

// ✅ fetch medicines by distributor (with optional search + log)
export const fetchDistributorMedicines = async (distributorId, search) => {
  const url =
    search && search.length >= 3
      ? `/api/distributors/${distributorId}/medicines?search=${search}`
      : `/api/distributors/${distributorId}/medicines`;

  console.log("📡 API CALL:", url);
  const res = await api.get(url);
  return res.data;
};

// ✅ place order
export const placeOrder = async (orderData) => {
  const res = await api.post(`/api/orders`, orderData);
  return res.data;
};

// ✅ fetch my orders
export const getMyOrders = async (retailerId) => {
  const res = await api.get(`/api/orders/retailer/${retailerId}`);
  return res.data;
};

export default api;
