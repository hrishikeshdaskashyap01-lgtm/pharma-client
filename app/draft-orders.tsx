// app/draft-orders.tsx
import React, { useEffect, useState } from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 
import { useRouter } from "expo-router";
import { BASE_URL } from "../constants/config";

export default function DraftOrders() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`${BASE_URL}/api/orders/drafts/retailer123`)
      .then((res) => res.json())
      .then(setDrafts)
      .catch((err) => console.error("❌ Fetch drafts failed", err));
  }, []);

  const openDraft = (draft: any) => {
    if (draft.source === "viaProduct") {
      router.push(`/new-order-product?draftId=${draft._id}`);
    } else {
      router.push(`/distributor/DistributorUI?draftId=${draft._id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* ✅ Simple Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>📝 Draft Orders</Text>
      </View>

      {/* ✅ Draft List */}
      <FlatList
        contentContainerStyle={styles.list}
        data={drafts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openDraft(item)}>
            <Text style={styles.dist}>
              Distributor: {item.distributorId?.name || item.distributorId}
            </Text>
            <Text>Total: ₹{item.total}</Text>
            <Text>Items: {item.items.length}</Text>
            <Text>Source: {item.source}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No drafts found.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerText: { fontSize: 18, fontWeight: "bold" },
  list: { padding: 16 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginBottom: 10,
  },
  dist: { fontWeight: "600" },
});
