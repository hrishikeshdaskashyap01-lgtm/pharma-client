import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppBar() {
  return (
    <View style={styles.container}>
      {/* Left: profile */}
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={28} color="#333" />
      </TouchableOpacity>

      {/* Middle: search box */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color="#666" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Product Search"
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Right: share, bell, donut */}
      <View style={styles.rightIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-social-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          {/* donut-ish options icon */}
          <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 18,
    paddingHorizontal: 10,
    height: 36,
  },
  searchInput: {
    flex: 1,
    height: "100%",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    paddingHorizontal: 6,
  },
});
