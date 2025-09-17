// app/screens/LoginScreen.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ added

export default function LoginScreen({ onLogin, onRegister, onForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1508780709619-79562169bc64" }}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.logo}>pharma App</Text>
          <Text style={styles.subTitle}>Retailer v2.9.2</Text>

          {/* Username */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Username / Mobile Number"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={onForgot}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity style={styles.button} onPress={() => onLogin(email, password)}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Register */}
          <Text style={styles.footerText}>
            New user?{" "}
            <Text style={styles.link} onPress={onRegister}>
              Create Account
            </Text>
          </Text>
        </View>

        <Text style={styles.bottomFooter}>2025 © Pharma App</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  logo: { fontSize: 28, fontWeight: "bold", color: "#0077cc" },
  subTitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 8 },
  forgot: { alignSelf: "flex-end", color: "#0077cc", marginBottom: 20 },
  button: {
    backgroundColor: "#f5821f",
    paddingVertical: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footerText: { fontSize: 14, color: "#333" },
  link: { color: "#0077cc", fontWeight: "bold" },
  bottomFooter: { position: "absolute", bottom: 10, fontSize: 12, color: "#666" },
});
