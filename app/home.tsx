// app/home.tsx
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ fix
import HomeUIWithBars from "../components/HomeUIWithBars";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <HomeUIWithBars
        onNewOrder={() => router.push("/new-order")}
        onMyOrders={() => router.push("/my-orders")}
        onDraftOrder={() => router.push("/draft-orders")}
        onAddDistributor={() => router.push("/add-distributor")}
        onProductSearch={() => router.push("/product-search")}
        onSchemes={() => router.push("/schemes")}
      />
    </SafeAreaView>
  );
}
