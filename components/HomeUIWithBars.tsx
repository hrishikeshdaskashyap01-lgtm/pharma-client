// client/components/HomeUIWithBars.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ SafeAreaView import
import AppBar from "./AppBar";
import BottomBar from "./BottomBar";
import BannerCarousel from "./BannerCarousel";

interface HomeUIProps {
  onNewOrder: () => void;
  onMyOrders: () => void;
  onDraftOrder: () => void;
  onAddDistributor: () => void;
  onProductSearch: () => void;
  onSchemes: () => void;
}

export default function HomeUIWithBars(props: HomeUIProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["left", "right"]}>
      {/* ✅ Top App Bar (ab upar chipak jayega) */}
      <AppBar />

      <ScrollView contentContainerStyle={styles.container}>
        {/* ✅ Banner Carousel */}
        <BannerCarousel />

        {/* Grid Menu */}
        <View style={styles.grid}>
          <MenuCard label="New Order" icon="📄" onPress={props.onNewOrder} />
          <MenuCard label="My Orders" icon="📑" onPress={props.onMyOrders} />
          <MenuCard label="Draft Order" icon="📝" onPress={props.onDraftOrder} />
          <MenuCard label="Add Distributor" icon="➕" onPress={props.onAddDistributor} />
          <MenuCard label="Product Search" icon="🔍" onPress={props.onProductSearch} />
          <MenuCard label="Schemes" icon="📊" onPress={props.onSchemes} />
        </View>
      </ScrollView>

      {/* ✅ Bottom Bar */}
      <BottomBar />
    </SafeAreaView>
  );
}

// ✅ MenuCard (Grid Item)
const MenuCard = ({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.cardText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
