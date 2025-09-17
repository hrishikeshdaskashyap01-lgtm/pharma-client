import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

interface RegisterUIProps {
  formData: any;
  setFormData: (data: any) => void;
  onBack: () => void;
  onRegister: () => void;
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export default function RegisterUI({
  formData,
  setFormData,
  onBack,
  onRegister,
}: RegisterUIProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo + Title */}
      <View style={styles.logoContainer}>
        <Ionicons name="medkit" size={60} color="#007bff" />
        <Text style={styles.title}>Pharma App</Text>
        <Text style={styles.subtitle}>Retailer</Text>
      </View>

      {/* Dropdown: Type of Business */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={formData.businessType}
          onValueChange={(value) =>
            setFormData({ ...formData, businessType: value })
          }
        >
          <Picker.Item label="Select Type of Business" value="" />
          <Picker.Item label="Retailer" value="retailer" />
          <Picker.Item label="Distributor" value="distributor" />
          <Picker.Item label="Wholesaler" value="wholesaler" />
        </Picker>
      </View>

      {/* Shop / Firm Full Name */}
      <TextInput
        style={styles.input}
        placeholder="Shop/Firm Full Name"
        value={formData.shopName}
        onChangeText={(text) => setFormData({ ...formData, shopName: text })}
      />

      {/* Owner Name */}
      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={formData.ownerName}
        onChangeText={(text) => setFormData({ ...formData, ownerName: text })}
      />

      {/* Shop Address */}
      <TextInput
        style={styles.input}
        placeholder="Shop Address"
        value={formData.shopAddress}
        onChangeText={(text) => setFormData({ ...formData, shopAddress: text })}
      />

      {/* Pincode */}
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        keyboardType="numeric"
        value={formData.pincode}
        onChangeText={(text) => setFormData({ ...formData, pincode: text })}
      />

      {/* City */}
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => setFormData({ ...formData, city: text })}
      />

      {/* Area */}
      <TextInput
        style={styles.input}
        placeholder="Area"
        value={formData.area}
        onChangeText={(text) => setFormData({ ...formData, area: text })}
      />

      {/* State */}
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={formData.state}
          onValueChange={(value) => setFormData({ ...formData, state: value })}
        >
          <Picker.Item label="Select State" value="" />
          {indianStates.map((state, index) => (
            <Picker.Item key={index} label={state} value={state} />
          ))}
        </Picker>
      </View>

      {/* Mobile Number */}
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={formData.mobile}
        onChangeText={(text) => setFormData({ ...formData, mobile: text })}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />

      {/* Email (Optional) */}
      <TextInput
        style={styles.input}
        placeholder="Email Address (Optional)"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />

      {/* Drug License */}
      <TextInput
        style={styles.input}
        placeholder="Drug License Number"
        value={formData.license}
        onChangeText={(text) => setFormData({ ...formData, license: text })}
      />

      {/* Upload / Capture Drug License */}
      <TouchableOpacity style={styles.uploadBtn}>
        <Ionicons name="camera" size={20} color="#fff" />
        <Text style={styles.uploadText}> Upload / Capture License</Text>
      </TouchableOpacity>

      {/* GSTIN (Optional) */}
      <TextInput
        style={styles.input}
        placeholder="GSTIN (Optional)"
        value={formData.gstin}
        onChangeText={(text) => setFormData({ ...formData, gstin: text })}
      />

      {/* Terms & Conditions */}
      <TouchableOpacity
  style={styles.checkboxContainer}
  onPress={() => setFormData({ ...formData, agreeTerms: !formData.agreeTerms })}
>
  <Ionicons
    name={formData.agreeTerms ? "checkbox-outline" : "square-outline"}
    size={20}
    color="black"
  />
  <Text style={styles.checkboxText}>
    I agree to terms and conditions of Pharma App
  </Text>
</TouchableOpacity>


      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "orange",
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 5,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  backBtn: {
    flex: 1,
    backgroundColor: "gray",
    padding: 14,
    borderRadius: 10,
    marginRight: 6,
    alignItems: "center",
  },
  registerBtn: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    marginLeft: 6,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
