export async function POST(request: Request) {
  const res = await request.json();

  const sessionToken = res.jwtToken;

  if (!sessionToken) {
    return Response.json(
      { message: "Không thể lưu phiên đăng nhập" },
      {
        status: 400,
      }
    );
  }

  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
      },
    }
  );
}
