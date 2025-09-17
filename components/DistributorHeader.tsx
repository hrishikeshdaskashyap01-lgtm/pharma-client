import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function DistributorHeader() {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.row}>
      <Checkbox value={checked} onValueChange={setChecked} />
      <Text style={styles.text}>Non-mapped Distributors</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
  },
});
