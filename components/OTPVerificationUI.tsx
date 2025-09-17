import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface OTPVerificationUIProps {
  otp: string;
  setOtp: (otp: string) => void;
  onVerify: () => void;
  onResend: () => void;
}

export default function OTPVerificationUI({
  otp,
  setOtp,
  onVerify,
  onResend,
}: OTPVerificationUIProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.verifyBtn} onPress={onVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>

      {/* ✅ Resend OTP button */}
      <TouchableOpacity style={styles.resendBtn} onPress={onResend}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, width: "100%", borderRadius: 5 },
  verifyBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 12,
  },
  verifyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  resendBtn: { padding: 8 },
  resendText: { color: "#007bff", fontSize: 14, fontWeight: "bold" },
});
