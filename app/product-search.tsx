// client/app/product-search.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from "../constants/config";

export default function ProductSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔎 Debounced search
  useEffect(() => {
    const fetchData = async () => {
      if (search.length >= 3) {
        setLoading(true);
        try {
          const res = await fetch(`${BASE_URL}/api/global-search?search=${encodeURIComponent(search)}`);
          const data = await res.json();
          console.log("🌍 Global Search:", search, "=>", data?.length, "results");
          setResults(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("❌ Global search failed:", err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };

    const delay = setTimeout(fetchData, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const getStockColor = (stock: number) => {
    if (stock === 0) return "red";
    if (stock < 20) return "blue";
    return "green";
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🌍 Emergency Product Search</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter medicine name..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={22} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {search.length > 0 && search.length < 3 && (
        <Text style={styles.warning}>⚠️ Please enter minimum 3 characters</Text>
      )}

      {loading && <Text style={{ marginTop: 10 }}>Loading...</Text>}

      {/* Results */}
      <FlatList
        data={results}
        keyExtractor={(item, idx) => `${item._id}-${idx}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.medicineName, { color: getStockColor(item.stock) }]}>
              {item.name}
            </Text>
            <Text style={styles.meta}>Distributor: {item.distributor?.name || "Unknown"}</Text>
            <Text style={styles.meta}>Stock: {item.stock ?? "N/A"}</Text>
            <Text style={styles.meta}>PTR: {item.ptr ?? "-"} | MRP: {item.mrp ?? "-"}</Text>
            {item.distributor?.phone && (
              <Text style={styles.contact}>📞 {item.distributor.phone}</Text>
            )}
            {item.distributor?.email && (
              <Text style={styles.contact}>✉️ {item.distributor.email}</Text>
            )}
            {item.distributor?.address && (
              <Text style={styles.contact}>📍 {item.distributor.address}</Text>
            )}
          </View>
        )}
        ListEmptyComponent={!loading && search.length >= 3 ? <Text>No results found</Text> : null}
      />

      {/* Stock Legend */}
      <View style={styles.legendRow}>
        <Text style={{ color: "green" }}>🟢 In Stock</Text>
        <Text style={{ color: "blue" }}>🔵 Low Stock</Text>
        <Text style={{ color: "red" }}>🔴 Out of Stock</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    alignItems: "center",
    height: 44,
  },
  searchInput: { flex: 1, height: 40 },
  clearButton: { paddingHorizontal: 6 },
  warning: { color: "red", marginTop: 8 },
  card: {
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fafafa",
  },
  medicineName: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  meta: { fontSize: 13, color: "#555" },
  contact: { fontSize: 13, color: "#333", marginTop: 2 },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});
