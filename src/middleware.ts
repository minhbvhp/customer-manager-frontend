import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const privatePaths = ["/dashboard"];
const authPaths = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies?.get("accessToken")?.value;

  const decoded = accessToken ? jwtDecode(accessToken) : "";
  console.log(decoded);

  //Check if need login
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Redirect dash board if already login
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard", "/login"],
  matcher: [...privatePaths, ...authPaths],
};
