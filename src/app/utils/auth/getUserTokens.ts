import { NextRequest } from "next/server";
import { UserCredentials } from "@/app/lib/definitions";

export function getUsersToken(request: NextRequest): UserCredentials | null {
  const accessTokenFromCookie = request.cookies?.get("accessToken")?.value;
  const refreshTokenFromCookie = request.cookies?.get("refreshToken")?.value;

  if (!accessTokenFromCookie && !refreshTokenFromCookie) return null;

  const credentials = {
    accessToken: accessTokenFromCookie,
    refreshToken: refreshTokenFromCookie,
  } as UserCredentials;

  return credentials;
}
