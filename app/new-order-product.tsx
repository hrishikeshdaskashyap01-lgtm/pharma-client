import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { fetchMedicines, placeOrder } from "../services/api";
import Toast from "react-native-toast-message";

export default function NewOrderProduct() {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  // Debounced API call
  useEffect(() => {
    const fetchData = async () => {
      if (search.length >= 3) {
        setLoading(true);
        try {
          const data = await fetchMedicines(search);
          console.log("🔍 API search:", search, "=>", data?.length, "results");
          setResults(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error("❌ Medicine fetch failed:", err);
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

  const addToCart = (item: any) => {
    console.log("➕ Adding to cart:", item.name, item._id, item.distributorId);
    setCart((prev) => {
      const existing = prev.find(
        (p) => p._id === item._id && p.distributorId === item.distributorId
      );
      if (existing) {
        return prev.map((p) =>
          p._id === item._id && p.distributorId === item.distributorId
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }
      return [...prev, { ...item, qty: 1, free: 0, hs: 0, pkg: 10, case: 1, box: 1 }];
    });

    setSearch("");
    setResults([]);
  };

  const updateQty = (id: string, distributorId: string, change: number) => {
    console.log("✏️ Update qty:", id, distributorId, change);
    setCart((prev) =>
      prev.map((p) =>
        p._id === id && p.distributorId === distributorId
          ? { ...p, qty: Math.max(1, p.qty + change) }
          : p
      )
    );
  };

  const removeFromCart = (id: string, distributorId: string) => {
    console.log("🗑 Removing:", id, distributorId);
    setCart((prev) => prev.filter((p) => !(p._id === id && p.distributorId === distributorId)));
  };

  const grandTotal = cart.reduce((sum, p) => sum + (p.ptr || 0) * p.qty, 0);

  // Confirm order: group by distributor and send one order per distributor
  const confirmOrder = async () => {
    console.log("🟢 CONFIRM button clicked");
    try {
      if (cart.length === 0) {
        Toast.show({ type: "error", text1: "❌ Error", text2: "Cart is empty" });
        return;
      }

      // group items by distributorId
      const groups: Record<string, any[]> = {};
      cart.forEach((c) => {
        const did = c.distributorId || "unknown";
        if (!groups[did]) groups[did] = [];
        groups[did].push(c);
      });

      console.log("📤 Will send orders for distributors:", Object.keys(groups));

      const promises = Object.entries(groups).map(async ([distributorId, items]) => {
        const payload = {
          retailerId: "retailer123",
          distributorId,
          items: items.map((c) => ({
            medicineId: c._id,
            name: c.name,
            brand: c.brand,
            price: c.ptr,
            qty: c.qty,
          })),
          total: items.reduce((s, it) => s + (it.ptr || 0) * it.qty, 0),
          status: "placed",
        };

        console.log("📤 Final Order Payload for", distributorId, ":", payload);
        // placeOrder uses existing API helper
        return placeOrder(payload);
      });

      const results = await Promise.allSettled(promises);

      // analyze results
      const succeededDistributorIds: string[] = [];
      const failed: any[] = [];

      results.forEach((r, idx) => {
        const distributorId = Object.keys(groups)[idx];
        if (r.status === "fulfilled") {
          succeededDistributorIds.push(distributorId);
        } else {
          failed.push({ distributorId, reason: r.reason });
        }
      });

      if (succeededDistributorIds.length > 0) {
        // remove succeeded items from cart
        setCart((prev) => prev.filter((c) => !succeededDistributorIds.includes(c.distributorId)));
      }

      if (failed.length === 0) {
        const msg = succeededDistributorIds.length > 1 ? "Orders sent to distributors" : "Order sent to distributor";
        if (Platform.OS === "web") {
          window.alert("✅ " + msg);
        } else {
          Toast.show({ type: "success", text1: "✅ Success", text2: msg });
        }
      } else {
        console.error("❌ Some orders failed:", failed);
        Toast.show({
          type: "error",
          text1: "Partial Failure",
          text2: `Failed for ${failed.map((f) => f.distributorId).join(", ")}`,
        });
      }
    } catch (err: any) {
      console.error("❌ Order failed:", err);
      Toast.show({
        type: "error",
        text1: "❌ Error",
        text2: err?.message || "Order failed",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Checkbox + Label */}
      <View style={styles.row}>
        <Checkbox value={checked} onValueChange={setChecked} />
        <Text style={styles.headerText}>Non-mapped Distributors</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Product Name"
          placeholderTextColor="#888"
          value={search}
          onChangeText={(txt) => {
            console.log("⌨️ Typing search:", txt);
            setSearch(txt);
          }}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="gray" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Stock legend (same as DistributorUI) */}
      <View style={styles.legendRow}>
        <Text style={{ color: "green", fontWeight: "600" }}>In Stock</Text>
        <Text style={{ color: "blue", fontWeight: "600" }}>Low Stock</Text>
        <Text style={{ color: "red", fontWeight: "600" }}>No Stock</Text>
      </View>

      {search.length > 0 && search.length < 3 && (
        <Text style={styles.warning}>Please enter minimum 3 characters to search</Text>
      )}

      {loading && <Text style={{ marginTop: 10 }}>Loading...</Text>}
      {!loading && results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={results}
            extraData={results}
            keyExtractor={(item, index) => `${item._id}-${item.distributorId}-result-${index}`}
            renderItem={({ item }) => {
              let stockColor = "green";
              if (item.stock === 0) stockColor = "red";
              else if (item.stock < 20) stockColor = "blue";

              return (
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <View style={styles.resultItem}>
                    <Text style={{ fontWeight: "bold", color: stockColor }}>
                      {item.name} {item.code && `(${item.code})`}
                    </Text>
                    {item.distributorName && (
                      <Text style={{ fontSize: 13, color: "#555" }}>{item.distributorName}</Text>
                    )}
                    {item.stock !== undefined && (
                      <Text style={{ fontSize: 12, color: "#333" }}>Stk: {item.stock}</Text>
                    )}
                    <Text style={{ fontSize: 12, color: "#333" }}>
                      {item.mrp ? `MRP: ₹${item.mrp}` : ""}
                      {item.ptr ? ` | PTR: ${item.ptr}` : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={<Text style={{ marginTop: 10 }}>⚠️ No results found</Text>}
          />
        </View>
      )}

      <Text style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
        🛒 Cart Items: {cart.length}
      </Text>

      {cart.length > 0 && (
        <ScrollView style={styles.cartContainer} keyboardShouldPersistTaps="handled">
          {cart.map((c, idx) => (
            <View key={`${c._id}-${c.distributorId}-${idx}`}>
              <View style={styles.cartRow}>
                <Text style={{ flex: 2, fontWeight: "bold" }}>
                  {c.name} {c.distributorName ? `(${c.distributorName})` : "(Unknown)"}
                </Text>
                <View style={styles.qtyControls}>
                  <TouchableOpacity onPress={() => updateQty(c._id, c.distributorId, -1)}>
                    <Ionicons name="remove-circle" size={20} color="red" />
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 6 }}>{c.qty}</Text>
                  <TouchableOpacity onPress={() => updateQty(c._id, c.distributorId, 1)}>
                    <Ionicons name="add-circle" size={20} color="green" />
                  </TouchableOpacity>
                </View>
                <Text style={{ flex: 1, textAlign: "center" }}>{c.free}</Text>
                <Text style={{ flex: 1, textAlign: "center" }}>{c.hs}</Text>
                <Text style={{ flex: 1, textAlign: "right" }}>
                  {(c.ptr * c.qty).toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(c._id, c.distributorId)}
                  style={{ marginLeft: 8 }}
                >
                  <Ionicons name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>

              <View style={styles.distributorBox}>
                <Text style={{ fontWeight: "bold" }}>
                  Distributor: {c.distributorName || "Unknown"}
                </Text>
                <View style={styles.distRow}>
                  <Text style={styles.distCell}>Stock: {c.stock}</Text>
                  <Text style={styles.distCell}>Pkg: {c.pkg}</Text>
                  <Text style={styles.distCell}>Case: {c.case}</Text>
                  <Text style={styles.distCell}>Box: {c.box}</Text>
                  <Text style={styles.distCell}>MRP: {c.mrp}</Text>
                  <Text style={styles.distCell}>PTR: {c.ptr}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.totalRow}>
            <Text style={{ fontWeight: "bold" }}>Grand Total</Text>
            <Text style={{ fontWeight: "bold", color: "blue" }}>₹ {grandTotal.toFixed(2)}</Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#f88" }]}>
              <Text style={styles.actionText}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#ffd966" }]}>
              <Text style={styles.actionText}>DRAFT PO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#b6d7a8" }]}
              onPress={confirmOrder}
            >
              <Text style={styles.actionText}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  headerText: { marginLeft: 8, fontSize: 16, fontWeight: "500" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 44,
    zIndex: 1000,
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  searchInput: { flex: 1, height: 40 },
  clearButton: { paddingHorizontal: 8 },
  menuButton: { paddingHorizontal: 8 },
  warning: { color: "red", marginTop: 8 },
  dropdown: {
    position: "absolute",
    top: 160,
    left: 16,
    right: 16,
    maxHeight: 250,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    zIndex: 999,
  },
  resultItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eee", paddingHorizontal: 8 },
  cartContainer: {
    marginTop: 20,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  cartRow: { flexDirection: "row", alignItems: "center", marginBottom: 6, paddingHorizontal: 8 },
  qtyControls: { flexDirection: "row", alignItems: "center", flex: 2, justifyContent: "center" },
  distributorBox: { marginBottom: 10, padding: 6, backgroundColor: "#fff" },
  distRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  distCell: { fontSize: 12, marginRight: 12 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 6,
    paddingHorizontal: 8,
  },
  actionRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12, paddingHorizontal: 8 },
  actionButton: { flex: 1, padding: 10, marginHorizontal: 4, borderRadius: 4, alignItems: "center" },
  actionText: { fontWeight: "bold" },
});
