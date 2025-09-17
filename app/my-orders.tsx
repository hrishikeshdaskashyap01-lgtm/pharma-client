// client/app/MyOrders.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, StyleSheet } from "react-native";
import { getMyOrders } from "../services/api";

interface Order {
  _id: string;
  distributorId: { _id: string; name: string } | string; // 👈 can be populated or raw string
  total: number;
  status: "placed" | "uploaded" | "processed";
  items: { name: string; qty: number }[];
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyOrders("retailer123"); // 🔹 future: dynamic retailerId
        setOrders(data);
      } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
      }
    })();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "placed":
        return { color: "orange", label: "Placed" };
      case "uploaded":
        return { color: "blue", label: "Uploaded" };
      case "processed":
        return { color: "green", label: "Processed" };
      default:
        return { color: "gray", label: status };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📦 My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const statusInfo = getStatusStyle(item.status);
          const distributorName =
            typeof item.distributorId === "object"
              ? item.distributorId.name
              : item.distributorId;

          return (
            <View style={styles.card}>
              <Text style={styles.distributor}>Distributor: {distributorName}</Text>
              <Text>Total: ₹{item.total}</Text>
              <Text>Items: {item.items.length}</Text>
              <Text style={{ color: statusInfo.color, fontWeight: "bold" }}>
                Status: {statusInfo.label}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text>No orders found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },
  distributor: { fontWeight: "600", marginBottom: 5 },
});
