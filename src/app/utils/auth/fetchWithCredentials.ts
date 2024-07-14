import { NextRequest } from "next/server";
import { getUsersToken } from "@/app/utils/auth/getUserTokens";
import saveUserTokens from "@/app/utils/auth/saveUserTokens";
import { jwtDecode } from "jwt-decode";

const BACKEND_URL = process.env["BACKEND_URL"];
const MAX_TIME_REFRESH = 0;

export default async function fetchWithCredentials(
  path: string,
  init: RequestInit | undefined,
  req: NextRequest
) {
  const userTokens = getUsersToken(req);

  if (!userTokens) {
    return {
      message: "No credentials provided",
      statusCode: 401,
    };
  }

  const requestToFetch = makeFetch(path, userTokens.accessToken, init);

  const accessTokenDecode = jwtDecode(userTokens.accessToken);
  const accessTokenExpires = Number(accessTokenDecode.exp);

  if (
    !userTokens.accessToken ||
    accessTokenExpires - (Date.now() + MAX_TIME_REFRESH) < 0
  ) {
    const newTokens = await refresh(userTokens.refreshToken);

    if ("accessToken" in newTokens) {
      saveUserTokens(newTokens);
      return await requestToFetch(newTokens.accessToken);
    }
    return newTokens;
  }

  return requestToFetch();
}

async function refresh(refreshToken: string) {
  const url = BACKEND_URL + "/auth/refresh";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
}

function makeFetch(
  path: string,
  accessToken: string,
  init: RequestInit | undefined
): (newAccessToken?: string) => Promise<any> {
  return async function (newAccessToken?: string) {
    return fetch(`${BACKEND_URL}/${path}`, {
      headers: {
        Authorization: `Bearer ${newAccessToken ?? accessToken}`,
      },
      ...init,
    }).then((res) => res.json());
  };
}
