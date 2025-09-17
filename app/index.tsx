// app/index.tsx
import { Redirect } from "expo-router";
//import DistributorUI from "./distributor/DistributorUI";

export default function AppIndex() {
  // ✅ Jab app open hoga, seedha splash screen pe bhej do
  return <Redirect href="/splash" />;
}
