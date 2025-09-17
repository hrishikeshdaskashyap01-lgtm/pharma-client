import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} style={styles.input} />
      <Button title="Send Reset Link" onPress={() => alert("Reset link sent to " + email)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, width: "100%", borderRadius: 5 },
});
