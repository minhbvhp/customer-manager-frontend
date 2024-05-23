export async function fetchAllCustomers() {
  try {
    const url = process.env.BACKEND_URL + "/customers";
    const allCustomers = await fetch(url, { cache: "no-store" });
    return allCustomers.json();
  } catch {
    return [];
  }
}

export async function fetchAllProvinces() {
  try {
    const url = process.env.BACKEND_URL + "/addresses";
    const allProvinces = await fetch(url, { cache: "no-store" });
    return allProvinces.json();
  } catch {
    return [];
  }
}
