import { generateTokens, verifyToken } from "@/lib/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("refreshToken")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "Refresh token missing" },
      { status: 400 },
    );
  }
  try {
    var decodedToken = await verifyToken(token);
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  }
  const { accessToken, refreshToken } = await generateTokens({
    id: decodedToken.id,
  });
  const response = NextResponse.json(
    { message: "Tokens refreshed successfully" },
    { status: 200 },
  );
  const prod = process.env.NODE_ENV === "production";
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: prod,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: prod,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
};
