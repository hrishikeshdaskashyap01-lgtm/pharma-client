import React, { useState } from "react";
import { useRouter } from "expo-router";
import RegisterUI from "../components/RegisterUI";
import { validateRegisterForm } from "../utils/validation"; // ✅ new import

export default function Register() {
  const router = useRouter();

  // 🔹 Sabhi fields ke liye ek hi state
  const [formData, setFormData] = useState({
    businessType: "",
    shopName: "",
    ownerName: "",
    shopAddress: "",
    pincode: "",
    city: "",
    area: "",
    state: "",
    mobile: "",
    password: "",
    email: "",
    license: "",
    gstin: "",
    agreeTerms: false,  // ✅ NEW
  });

  // 🔹 Register button pe call hoga
  const handleRegister = () => {
    if (!validateRegisterForm(formData)) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    console.log("Form Data:", formData);
    router.push("/otp"); // ✅ tabhi chalega jab valid hoga
  };


  return (
    <RegisterUI
      formData={formData}
      setFormData={setFormData}
      onBack={() => router.back()}
      onRegister={handleRegister}
    />
  );
}
