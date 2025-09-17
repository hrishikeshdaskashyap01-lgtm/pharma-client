import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getStores } from "../services/distributorService";

export default function StoreDropdown() {
  const [stores, setStores] = useState<{ id: string; name: string }[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    async function fetchStores() {
      const data = await getStores();
      setStores(data);
    }
    fetchStores();
  }, []);

  return (
    <View style={styles.dropdownContainer}>
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => setSelected(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Store" value="" />
        {stores.map((store) => (
          <Picker.Item key={store.id} label={store.name} value={store.id} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    margin: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
});
