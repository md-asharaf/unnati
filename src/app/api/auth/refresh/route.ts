import { generateTokens, verifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const token = req.cookies.get("refreshToken")?.value;
    if (!token) {
        return NextResponse.json({ error: "Refresh token missing" }, { status: 400 });
    }
    try {
        var decodedToken = await verifyToken(token)
    } catch (e) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }
    const { accessToken, refreshToken } = await generateTokens({ id: decodedToken.id });
    return NextResponse.json({ data: { accessToken, refreshToken }, message: "Tokens refreshed successfully" }, { status: 200 });
}