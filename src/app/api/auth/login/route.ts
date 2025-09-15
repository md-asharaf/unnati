import { db } from "@/lib/db";
import { Login, loginSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";
import OTPservice from "@/services/otp";
export const POST = async (req: NextRequest) => {
    const { email } = (await req.json()) as Login;
    if (!email) {
        return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }
    const result = loginSchema.parse({ email });

    const admin = await db.admin.findUnique({
        where: { email: result.email },
    });

    if (!admin) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    // send otp to email
    await OTPservice.sendOtp(result.email);
    return NextResponse.json({ message: "OTP sent to your email" }, { status: 200 });
};
