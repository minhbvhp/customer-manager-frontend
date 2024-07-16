import { cookies } from "next/headers";

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
    const accessToken = cookies().get("accessToken");
    const url = process.env.BACKEND_URL + "/customers";
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    const allCustomers = await res.json();
    return allCustomers.sort((a: any, b: any) => Number(b?.id) - Number(a?.id));
  } catch {
    return [];
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const accessToken = cookies().get("accessToken");
    const url = process.env.BACKEND_URL + `/customers/${id}`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    const customer = await res.json();

    if (customer.statusCode === 404) {
      return null;
    }

    return customer;
  } catch {
    return {};
  }
}

export async function getUserProfile() {
  try {
    const accessToken = cookies().get("accessToken");
    const url = process.env.BACKEND_URL + `/profile`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });
    const userProfile = await res.json();

    if (userProfile.statusCode === 404) {
      return "N/A";
    }

    return userProfile.name;
  } catch {
    return "N/A";
  }
}
