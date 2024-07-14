import { cookies } from "next/headers";
import { UserCredentials } from "@/app/lib/definitions";
import { jwtDecode } from "jwt-decode";

export default function saveUserTokens(credentials: UserCredentials) {
  const { accessToken, refreshToken } = credentials;
  const accessTokenDecode = jwtDecode(accessToken);
  const refreshTokenDecode = jwtDecode(refreshToken);

  cookies().set({
    name: "accessToken",
    value: accessToken,
    secure: true,
    httpOnly: true,
    expires: new Date(accessTokenDecode.exp! * 1000),
  });

  cookies().set({
    name: "refreshToken",
    value: refreshToken,
    secure: true,
    httpOnly: true,
    expires: new Date(refreshTokenDecode.exp! * 1000),
  });
}
