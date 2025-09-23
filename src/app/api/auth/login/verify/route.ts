import { VerifyLogin, verifyLoginSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import OTPService from "@/services/otp";
import { generateTokens } from "@/lib/token";
import { db } from "@/lib/db";
export const POST = async (req: NextRequest) => {
  const { email, otp } = (await req.json()) as VerifyLogin;
  if (!email || !otp) {
    return NextResponse.json(
      { error: "Email and OTP are required" },
      { status: 400 },
    );
  }
  const result = verifyLoginSchema.parse({ email, otp });

  const admin = await db.admin.findUnique({
    where: { email: result.email },
  });

  if (!admin) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { status } = await OTPService.verifyOtp(result.email, result.otp);
  if (!status) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  const { accessToken, refreshToken } = await generateTokens({ id: admin.id });
  const response = NextResponse.json(
    {
      message: "Logged in successfully",
      data: {
        admin
      }
    },
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
