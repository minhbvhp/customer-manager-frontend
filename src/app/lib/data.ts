import { custom } from "zod";

export async function fetchAllProvinces() {
  try {
    const url = process.env.BACKEND_URL + "/addresses";
    const res = await fetch(url, { cache: "no-store" });
    const allProvinces = await res.json();
    return allProvinces;
  } catch {
    return [];
  }
}

export async function fetchAllCustomers() {
  try {
    const url = process.env.BACKEND_URL + "/customers";
    const res = await fetch(url, { cache: "no-store" });
    const allCustomers = await res.json();
    return allCustomers.sort((a: any, b: any) => Number(b?.id) - Number(a?.id));
  } catch {
    return [];
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const url = process.env.BACKEND_URL + `/customers/${id}`;
    const res = await fetch(url, { cache: "no-store" });
    const customer: any = await res.json();

    if (customer.statusCode === 404) {
      return null;
    }

    return customer;
  } catch {
    return {};
  }
}
