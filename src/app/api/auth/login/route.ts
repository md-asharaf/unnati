import { db } from "@/app/lib/db";
import { Login, LoginSchema } from "@/app/schemas";
import OTPservice from "@/app/services/otp";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest, res: NextResponse) => {
    const { email } = (await req.json()) as Login;
    if (!email) {
        return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }
    const result = LoginSchema.parse({ email });

    const admin = await db.admin.findUnique({
        where: { email: result.email },
    });

    if (!admin) {
        return NextResponse.json({ error: "Invalid email" }, { status: 401 });
    }
    // send otp to email
    await OTPservice.sendOtp(result.email);
    return NextResponse.json({ message: "OTP sent" }, { status: 200 });
};
