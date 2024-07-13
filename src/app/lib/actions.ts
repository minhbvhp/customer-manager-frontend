"use server";
import {
  LoginPayload,
  NewCustomer,
  UpdateCustomer,
} from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const accessToken = cookies().get("accessToken");

export async function createCustomer(customer: NewCustomer) {
  try {
    const url = process.env.BACKEND_URL + "/customers";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
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

export async function login(payload: LoginPayload) {
  try {
    const url = process.env.BACKEND_URL + "/auth/login";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parsedRes = await res.json();
    const { jwtToken, refreshToken } = parsedRes;

    const accessTokenDecode = jwtDecode(jwtToken);

    const refreshTokenDecode = jwtDecode(refreshToken);

    cookies().set({
      name: "accessToken",
      value: parsedRes.jwtToken,
      secure: true,
      httpOnly: true,
      expires: new Date(accessTokenDecode.exp! * 1000),
    });

    cookies().set({
      name: "refreshToken",
      value: parsedRes.refreshToken,
      secure: true,
      httpOnly: true,
      expires: new Date(refreshTokenDecode.exp! * 1000),
    });

    return parsedRes;
  } catch {
    return {
      statusCode: 500,
      message: "Có lỗi xảy ra. Không thể đăng nhập",
    };
  }
}
