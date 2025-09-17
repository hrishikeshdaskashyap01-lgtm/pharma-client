// components/HomeUI.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

interface HomeUIProps {
  onNewOrder: () => void;
  onMyOrders: () => void;
  onDraftOrder: () => void;
  onAddDistributor: () => void;
  onProductSearch: () => void;
  onSchemes: () => void;
}

export default function HomeUI({
  onNewOrder,
  onMyOrders,
  onDraftOrder,
  onAddDistributor,
  onProductSearch,
  onSchemes,
}: HomeUIProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.searchBox}>🔍 Product Search</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>SCHEMES</Text>
        <Text style={styles.bannerSub}>Check Schemes and Offers of popular companies and products</Text>
      </View>

      {/* Menu Grid */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={onNewOrder}>
          <Text style={styles.icon}>📄</Text>
          <Text style={styles.cardText}>New Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onMyOrders}>
          <Text style={styles.icon}>📑</Text>
          <Text style={styles.cardText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onDraftOrder}>
          <Text style={styles.icon}>📝</Text>
          <Text style={styles.cardText}>Draft Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onAddDistributor}>
          <Text style={styles.icon}>➕</Text>
          <Text style={styles.cardText}>Add Distributor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onProductSearch}>
          <Text style={styles.icon}>🔍</Text>
          <Text style={styles.cardText}>Product Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={onSchemes}>
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.cardText}>Schemes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  searchBox: {
    fontSize: 16,
    color: "#555",
  },
  banner: {
    backgroundColor: "#FFD54F",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bannerSub: {
    fontSize: 12,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
  },
  icon: {
    fontSize: 28,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
});
