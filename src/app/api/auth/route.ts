export async function POST(request: Request) {
  const res = await request.json();

  const accessToken = res.jwtToken;

  if (!accessToken) {
    return Response.json(
      { message: "Có lỗi xảy ra. Không thể lưu phiên đăng nhập" },
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
        "Set-Cookie": `accessToken=${accessToken}; Path=/; HttpOnly`,
      },
    }
  );
}
