import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DistributorSearchBar() {
  const [text, setText] = useState("");

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={text}
        onChangeText={setText}
      />

      {/* Cross inside */}
      {text.length > 0 && (
        <TouchableOpacity onPress={() => setText("")} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="gray" />
        </TouchableOpacity>
      )}

      {/* 3-line icon outside */}
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={22} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  input: { flex: 1, height: 40 },
  clearButton: { position: "absolute", right: 35 },
  menuButton: { marginLeft: 6 },
});
