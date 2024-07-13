import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const privatePaths = ["/dashboard"];
const authPaths = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessTokenFromCookie = request.cookies?.get("accessToken")?.value;
  const refreshTokenFromCookie = request.cookies?.get("refreshToken")?.value;

  //Check if login require
  if (privatePaths.some((path) => pathname.startsWith(path))) {
    if (!accessTokenFromCookie && !refreshTokenFromCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!accessTokenFromCookie && refreshTokenFromCookie) {
      try {
        const url = process.env.BACKEND_URL + "/auth/refresh";
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            refreshToken: refreshTokenFromCookie,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const parsedRes = await res.json();

        console.log(parsedRes);

        const { jwtToken, refreshToken } = parsedRes;

        const accessTokenDecode = jwtDecode(jwtToken);

        const refreshTokenDecode = jwtDecode(refreshToken);

        const response = NextResponse.next();

        response.cookies.set({
          name: "accessToken",
          value: jwtToken,
          secure: true,
          httpOnly: true,
          expires: new Date(accessTokenDecode.exp! * 1000),
        });

        response.cookies.set({
          name: "refreshToken",
          value: refreshToken,
          secure: true,
          httpOnly: true,
          expires: new Date(refreshTokenDecode.exp! * 1000),
        });

        return response;
      } catch {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  //Redirect dash board if already login
  if (authPaths.some((path) => pathname.startsWith(path))) {
    const accessTokenFromCookie = request.cookies?.get("accessToken")?.value;

    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    if (accessTokenFromCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  }
}

export const config = {
  // matcher: ["/dashboard", "/login"],
  matcher: [...privatePaths, ...authPaths],
};
