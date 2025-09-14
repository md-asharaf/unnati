import { generateTokens, verifyToken } from "@/lib/token";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const token = req.cookies.get("refreshToken")?.value;
    if (!token) {
        return NextResponse.json({ message: "Refresh token missing" }, { status: 401 });
    }
    const decodedToken = verifyToken(token)
    if (!decodedToken || !decodedToken.id) {
        return NextResponse.json({ message: "Invalid refresh token" }, { status: 401 });
    }
    const { accessToken, refreshToken } = generateTokens({ id: decodedToken.id });
    return NextResponse.json({ data: { accessToken, refreshToken }, message: "Tokens refreshed successfully" }, { status: 200 });
}