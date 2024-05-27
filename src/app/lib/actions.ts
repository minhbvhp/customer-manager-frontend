"use server";
import { NewCustomer } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCustomer(customer: NewCustomer) {
  try {
    const url = process.env.BACKEND_URL + "/customers";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard/customers");
    return res.json();
  } catch {
    return {
      message: "Có lỗi xảy ra. Không tạo được khách hàng mới",
    };
  }
}
