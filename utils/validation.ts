// utils/validation.ts

export interface FormData {
  businessType: string;
  shopName: string;
  ownerName: string;
  shopAddress: string;
  pincode: string;
  city: string;
  area: string;
  state: string;
  mobile: string;
  password: string;
  email: string;
  license: string;
  gstin: string;
  agreeTerms: boolean; // ✅ NEW
}

export const validateRegisterForm = (formData: FormData) => {
  // Required fields list
  const requiredFields: (keyof FormData)[] = [
    "businessType",
    "shopName",
    "ownerName",
    "shopAddress",
    "pincode",
    "city",
    "area",
    "state",
    "mobile",
    "password",
  ];

  for (let field of requiredFields) {
    const value = formData[field];
    if (typeof value === "string" && value.trim() === "") {
      return false; // ⚠️ koi required string empty hai
    }
  }

  if (!formData.agreeTerms) {
    return false; // ⚠️ Terms accept nahi kiya
  }

  return true; // ✅ sab filled hai
};
