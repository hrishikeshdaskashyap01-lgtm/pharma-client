// distributor/DistributorUI.tsx
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useDistributorLogic } from "../../hooks/useDistributorLogic";
import { useLocalSearchParams } from "expo-router";
import { BASE_URL } from "../../constants/config";
import { fetchDistributorMedicines } from "../../services/api";

export default function DistributorUI() {
  const { checked, setChecked, stores, selected, setSelected, balance } =
    useDistributorLogic();

  const [medicines, setMedicines] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState("");
  const [selectedMedicine, setSelectedMedicine] = React.useState<any | null>(
    null
  );
  const [qty, setQty] = React.useState("");
  const [cart, setCart] = React.useState<any[]>([]);

  const { draftId } = useLocalSearchParams();

  React.useEffect(() => {
    if (selected && search.length >= 3) {
      fetchDistributorMedicines(selected, search)
        .then((data) => {
          setMedicines(data);
        })
        .catch((err) =>
          console.error("❌ Failed to fetch distributor medicines:", err)
        );
    } else {
      setMedicines([]);
    }
  }, [selected, search]);

  React.useEffect(() => {
    if (draftId) {
      fetch(`${BASE_URL}/api/orders/${draftId}`)
        .then((res) => res.json())
        .then((draft) => {
          if (draft) {
            setSelected(draft.distributorId);
            setCart(
              draft.items.map((item: any) => ({
                distributorId: draft.distributorId?.toString() || "",
                medicineId: item.medicineId,
                name: item.name,
                brand: item.brand,
                price: item.price,
                qty: item.qty,
              }))
            );
          }
        })
        .catch((err) => console.error("❌ Failed to fetch draft:", err));
    }
  }, [draftId]);

  const handleSelectSuggestion = (m: any) => {
    setSelectedMedicine(m);
    setSearch(m.name);
    setMedicines([]);
  };

  const addToCart = () => {
    if (!selectedMedicine || !qty) return;
    setCart((prev) => [
      ...prev,
      {
        distributorId: selected?.toString() || "",
        medicineId: selectedMedicine._id?.toString() || "",
        name: selectedMedicine.name,
        brand: selectedMedicine.brand,
        price: selectedMedicine.ptr,
        qty: Number(qty),
      },
    ]);
    setQty("");
    setSelectedMedicine(null);
    setSearch("");
  };

  const grandTotal = cart.reduce(
    (sum, item) => sum + item.qty * (item.price || 0),
    0
  );

  const clearCart = () => setCart([]);

  // ✅ Confirm Order API + Popup (mobile + web)
  const confirmOrder = async () => {
    try {
      const payload = {
        retailerId: "retailer123",
        distributorId: selected, // 👈 root level par distributorId
        items: cart.map((item) => ({
          medicineId: item.medicineId,
          name: item.name,
          brand: item.brand,
          price: item.price,
          qty: item.qty,
        })),
        total: grandTotal,
        status: "placed",
      };

      console.log("📤 Final Order Payload:", payload);

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        if (Platform.OS === "web") {
          window.alert("✅ Order sent to distributor");
          clearCart();
        } else {
          Alert.alert("✅ Success", "Order sent to distributor", [
            { text: "OK", onPress: () => clearCart() },
          ]);
        }
      } else {
        console.error("❌ API Error:", data);
        Alert.alert("Error", data.error || "Failed to place order");
      }
    } catch (err) {
      console.error("❌ Confirm Order Error:", err);
      Alert.alert("Error", "Something went wrong while placing the order.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Checkbox + label */}
        <View style={styles.row}>
          <Checkbox value={checked} onValueChange={setChecked} />
          <Text style={styles.headerText}>Non-mapped Distributors</Text>
        </View>

        {/* Dropdown */}
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selected}
            onValueChange={(val) => setSelected(val)}
            style={styles.picker}
          >
            <Picker.Item label="Select Store" value="" />
            {stores.map((store: any) => (
              <Picker.Item key={store._id} label={store.name} value={store._id} />
            ))}
          </Picker>
        </View>

        {selected ? (
          <>
            {/* Balance + Order history */}
            <View style={styles.balanceRow}>
              <Text style={styles.balanceText}>
                TOTAL BAL :{" "}
                <Text style={styles.balanceValue}>{balance}</Text>
              </Text>
              <TouchableOpacity>
                <Text style={styles.orderHistory}>ORDER HISTORY &gt;</Text>
              </TouchableOpacity>
            </View>

            {/* Stock legend */}
            <View style={styles.stockLegendRow}>
              <Text style={{ color: "green", fontWeight: "600" }}>In Stock</Text>
              <Text style={{ color: "blue", fontWeight: "600" }}>Low Stock</Text>
              <Text style={{ color: "red", fontWeight: "600" }}>No Stock</Text>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Product Name"
                placeholderTextColor="#888"
                value={search}
                onChangeText={(t) => {
                  setSearch(t);
                  setSelectedMedicine(null);
                }}
              />
              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={20} color="gray" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="menu" size={20} color="gray" />
              </TouchableOpacity>
            </View>

            {/* Suggestions */}
            {search.length >= 3 &&
              medicines.length > 0 &&
              !selectedMedicine && (
                <View style={styles.suggestionsBox}>
                  {medicines.map((m) => (
                    <TouchableOpacity
                      key={m._id}
                      style={styles.suggestionItem}
                      onPress={() => handleSelectSuggestion(m)}
                    >
                      <Text
                        style={[
                          styles.suggestionTitle,
                          m.stock > 10
                            ? { color: "green" }
                            : m.stock > 0
                            ? { color: "blue" }
                            : { color: "red" },
                        ]}
                      >
                        {m.name}
                      </Text>
                      <Text style={styles.suggestionMeta}>
                        PTR: {m.ptr ?? "-"} | MRP: {m.mrp ?? "-"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

            {/* Medicine details */}
            {selectedMedicine && (
              <View style={styles.card}>
                {/* Qty/Free/HS row */}
                <View style={styles.qtyHeaderRow}>
                  <Text style={styles.qtyHeader}>Qty</Text>
                  <Text style={styles.qtyHeader}>Free</Text>
                  <Text style={styles.qtyHeader}>HS</Text>
                  <TouchableOpacity style={styles.addButton} onPress={addToCart}>
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                      ADD &gt;
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />

                {/* Qty input */}
                <View style={styles.qtyInputRow}>
                  <TextInput
                    style={styles.qtyInput}
                    keyboardType="numeric"
                    value={qty}
                    onChangeText={setQty}
                    placeholder="0"
                  />
                </View>
                <View style={styles.separator} />

                {/* Scheme */}
                <View style={styles.schemeRow}>
                  <Text style={{ fontWeight: "600" }}>Scheme:</Text>
                </View>
                <View style={styles.separator} />

                {/* Stock table */}
                <View style={styles.stockTableHeader}>
                  <Text style={styles.stockCol}>Stock</Text>
                  <Text style={styles.stockCol}>Pkg</Text>
                  <Text style={styles.stockCol}>Case</Text>
                  <Text style={styles.stockCol}>Box</Text>
                  <Text style={styles.stockCol}>MRP</Text>
                  <Text style={styles.stockCol}>PTR</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.stockTableRow}>
                  <Text style={styles.stockCol}>
                    {selectedMedicine.stock ?? "-"}
                  </Text>
                  <Text style={styles.stockCol}>
                    {selectedMedicine.pack ?? "-"}
                  </Text>
                  <Text style={styles.stockCol}></Text>
                  <Text style={styles.stockCol}>
                    {selectedMedicine.box ?? "-"}
                  </Text>
                  <Text style={styles.stockCol}>
                    {selectedMedicine.mrp ?? "-"}
                  </Text>
                  <Text style={styles.stockCol}>
                    {selectedMedicine.ptr ?? "-"}
                  </Text>
                </View>
              </View>
            )}

            {/* Cart Section */}
            {cart.length > 0 && (
              <View style={styles.cartSection}>
                <Text style={styles.cartHeader}>Cart</Text>
                {cart.map((item, idx) => (
                  <View key={idx} style={styles.cartRow}>
                    <Text style={{ flex: 2 }}>{item.name}</Text>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                      {item.qty}
                    </Text>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                      {item.price}
                    </Text>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                      {(item.qty * item.price).toFixed(2)}
                    </Text>
                  </View>
                ))}
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryText}>
                    Grand Total ₹{grandTotal.toFixed(2)}, Items {cart.length}
                  </Text>
                </View>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "red" }]}
                    onPress={clearCart}
                  >
                    <Text style={styles.buttonText}>DELETE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "orange" }]}
                    onPress={() => console.log("Draft PO")}
                  >
                    <Text style={styles.buttonText}>DRAFT PO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "green" }]}
                    onPress={confirmOrder}
                  >
                    <Text style={styles.buttonText}>CONFIRM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", flex: 1 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  headerText: { marginLeft: 8, fontSize: 16, fontWeight: "500" },
  dropdownContainer: {
    marginVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  picker: { height: 50, width: "100%" },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "#fafafa",
  },
  balanceText: { fontSize: 15, fontWeight: "600" },
  balanceValue: { color: "blue", fontSize: 15, fontWeight: "700" },
  orderHistory: { color: "blue", fontWeight: "500", fontSize: 13 },
  stockLegendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 44,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  searchInput: { flex: 1, height: 40, paddingHorizontal: 8 },
  clearButton: { paddingHorizontal: 4 },
  menuButton: { paddingHorizontal: 4 },
  suggestionsBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginTop: 4,
    backgroundColor: "#fff",
    maxHeight: 180,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionTitle: { fontSize: 15, fontWeight: "600" },
  suggestionMeta: { fontSize: 12, color: "#555", marginTop: 2 },
  card: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  qtyHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    alignItems: "center",
  },
  qtyHeader: { flex: 1, fontWeight: "600", textAlign: "center" },
  addButton: {
    backgroundColor: "orange",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  separator: { height: 1, backgroundColor: "#eee" },
  qtyInputRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 8,
  },
  qtyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    width: 90,
    height: 38,
  },
  schemeRow: { paddingVertical: 8 },
  stockTableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    backgroundColor: "#fafafa",
  },
  stockTableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  stockCol: { flex: 1, textAlign: "center", fontSize: 13 },
  cartSection: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  cartHeader: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 6,
  },
  summaryRow: { marginTop: 10 },
  summaryText: { fontWeight: "700", fontSize: 16, color: "blue" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
});
