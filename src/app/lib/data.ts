export async function fetchAllCustomers() {
  const url = process.env.BACKEND_URL + "/customers";
  const allCustomers = await fetch(url);
  return allCustomers.json();
}
