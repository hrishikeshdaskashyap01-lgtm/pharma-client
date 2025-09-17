import { useState } from "react";
import { useRouter } from "expo-router";
import OTPVerificationUI from "../components/OTPVerificationUI";

export default function OTP() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (otp === "123456") {
      alert("✅ OTP Verified Successfully!");
      router.replace("/home");
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
  };

  const handleResend = () => {
    // Abhi demo ke liye sirf alert
    alert("📩 OTP resent to your number!");
  };

  return (
    <OTPVerificationUI
      otp={otp}
      setOtp={setOtp}
      onVerify={handleVerify}
      onResend={handleResend}
    />
  );
}
