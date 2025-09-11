import { db } from "@/app/lib/db";
import { VerifyLogin, VerifyLoginSchema } from "@/app/schemas";
import { NextRequest, NextResponse } from "next/server";
import OTPService from "@/app/services/otp";
import { generateTokens } from "@/app/lib/token";
export const POST = async (req: NextRequest) => {
    const { email, otp } = (await req.json()) as VerifyLogin;
    if (!email || !otp) {
        return NextResponse.json(
            { error: "Email and OTP are required" },
            { status: 400 },
        );
    }
    const result = VerifyLoginSchema.parse({ email, otp });

    const admin = await db.admin.findUnique({
        where: { email: result.email },
    });

    if (!admin) {
        return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }

    const { status } = await OTPService.verifyOtp(result.email, result.otp);
    if (!status) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    const { accessToken, refreshToken } = generateTokens({ id: admin.id });
    return NextResponse.json(
        { message: "OTP sent", data: { accessToken, refreshToken } },
        { status: 200 },
    );
};
