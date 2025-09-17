import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomBar() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="call-outline" size={24} color="#007bff" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
