import { NextResponse } from "next/server";

export const POST = async () => {
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("accessToken", "", { httpOnly: true, path: "/", maxAge: 0 });
    response.cookies.set("refreshToken", "", { httpOnly: true, path: "/", maxAge: 0 });
    return response;
}