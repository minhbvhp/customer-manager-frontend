export async function fetchAllCustomers() {
  try {
    const url = process.env.BACKEND_URL + "/customers";
    const allCustomers = await fetch(url, { cache: "no-store" });
    return allCustomers.json();
  } catch {
    return [];
  }
}
