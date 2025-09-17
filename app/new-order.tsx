// client/app/new-order.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ SafeAreaView import
import NewOrderDistributor from "./new-order-distributor";
import NewOrderProduct from "./new-order-product"; // 👈 ADD: import product UI

function ViaDistributor() {
  return (
    <View style={styles.contentBox}>
      <Text>📦 Distributor Based Ordering UI</Text>
    </View>
  );
}

// ❌ Old dummy ViaProduct removed, ab hum real NewOrderProduct use karenge

export default function NewOrderScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("distributor");

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* ✅ Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "distributor" && styles.activeTab]}
          onPress={() => setActiveTab("distributor")}
        >
          <Text style={styles.tabText}>VIA DISTRIBUTOR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "product" && styles.activeTab]}
          onPress={() => setActiveTab("product")}
        >
          <Text style={styles.tabText}>VIA PRODUCT</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Tab Content */}
      <View style={{ flex: 1 }}>
        {activeTab === "distributor" ? (
          <NewOrderDistributor />
        ) : (
          <NewOrderProduct /> // 👈 UPDATED: ab real product UI render hoga
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  tabContainer: { flexDirection: "row", backgroundColor: "#eee" },
  tab: { flex: 1, padding: 15, alignItems: "center" },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#FFA000" },
  tabText: { fontSize: 14, fontWeight: "bold", color: "#000" },
  contentBox: { flex: 1, alignItems: "center", justifyContent: "center" },
});
