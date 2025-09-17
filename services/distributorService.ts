// services/distributorService.ts
export async function getStores() {
  // ✅ Later replace with API call (axios/fetch)
  // const response = await fetch("https://api.example.com/stores");
  // return await response.json();

  return [
    { id: "1", name: "Store 1" },
    { id: "2", name: "Store 2" },
    { id: "3", name: "Store 3" },
  ];
}
