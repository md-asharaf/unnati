import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middlewares/auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const isApiRequest = pathname.startsWith("/api/");
    const isAuthRequest = pathname.startsWith("/api/auth/");
    const isPublicRequest = req.method === "GET";
    if (!isApiRequest || isAuthRequest || isPublicRequest)
        return NextResponse.next();
    const { error, id, status } = await requireAdmin(
        req.headers.get("Authorization"),
    );
    if (!id) return NextResponse.json({ error }, { status });
    const headers = new Headers(req.headers);
    headers.set("x-admin-id", id);
    return NextResponse.next({
        headers,
    });
}

export const config = {
    matcher: "/api/:path*",
};
