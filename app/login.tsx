import { useRouter } from "expo-router";
import LoginScreen from "./screens/LoginScreen";

export default function Login() {
  const router = useRouter();

  // Login button action
  const handleLogin = (email: string, password: string) => {
    console.log("Login pressed", email, password);
    router.replace("/home"); // ✅ Login ke baad home screen
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onRegister={() => router.push("/register")}
      onForgot={() => router.push("/forgot-password")}
    />
  );
}
