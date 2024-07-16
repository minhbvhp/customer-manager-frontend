"use server";
import {
  LoginPayload,
  NewCustomer,
  UpdateCustomer,
} from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function createCustomer(customer: NewCustomer) {
  const accessToken = cookies().get("accessToken");
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
    const accessToken = cookies().get("accessToken");
    const url = process.env.BACKEND_URL + `/customers/${id}`;
    const res = await fetch(url, {
      method: "PATCH",
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
      message: "Có lỗi xảy ra. Không thể cập nhật thông tin khách hàng",
    };
  }
}

export async function deleteCustomer(id: string) {
  try {
    const accessToken = await cookies().get("accessToken");
    const url = process.env.BACKEND_URL + `/customers/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
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

    const { accessToken, refreshToken } = parsedRes;

    const accessTokenDecode = jwtDecode(accessToken);

    const refreshTokenDecode = jwtDecode(refreshToken);

    cookies().set({
      name: "accessToken",
      value: accessToken,
      secure: true,
      httpOnly: true,
      expires: payload.remember
        ? new Date(accessTokenDecode.exp! * 1000)
        : undefined,
    });

    cookies().set({
      name: "refreshToken",
      value: refreshToken,
      secure: true,
      httpOnly: true,
      expires: payload.remember
        ? new Date(refreshTokenDecode.exp! * 1000)
        : undefined,
    });

    return parsedRes;
  } catch {
    return {
      statusCode: 500,
      message: "Có lỗi xảy ra. Không thể đăng nhập",
    };
  }
}

export async function logOut() {
  try {
    const accessToken = cookies().get("accessToken");
    const url = process.env.BACKEND_URL + `/auth/logout`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    cookies().delete("accessToken");
    cookies().delete("refreshToken");

    return await res.json();
  } catch {
    return {
      statusCode: 500,
      message: "Có lỗi xảy ra!",
    };
  }
}
