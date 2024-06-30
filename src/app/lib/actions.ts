"use server";
import { NewCustomer, UpdateCustomer } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";

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
      statusCode: 500,
      message: "Có lỗi xảy ra. Không tạo được khách hàng mới",
    };
  }
}

export async function updateCustomer(id: string, customer: UpdateCustomer) {
  try {
    const url = process.env.BACKEND_URL + `/customers/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard/customers");
    return res.json();
  } catch {
    return {
      statusCode: 500,
      message: "Có lỗi xảy ra. Không thể cập nhật thông tin khách hàng",
    };
  }
}

export async function deleteCustomer(id: string) {
  try {
    const url = process.env.BACKEND_URL + `/customers/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard/customers");
    return res.json();
  } catch {
    return {
      statusCode: 500,
      message: "Có lỗi xảy ra. Không thể xóa khách hàng",
    };
  }
}
