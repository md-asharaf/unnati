import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middlewares/auth";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log("Middleware called for path:", pathname);
    console.log("Request method:", req.method);
    const isApiRequest = pathname.startsWith("/api/");
    const isAuthRequest = pathname.startsWith("/api/auth/");
    const isPublicRequest = req.method === 'get'
    if (!isApiRequest || isAuthRequest || isPublicRequest) return NextResponse.next();
    const { error, id, status } = await requireAdmin(req.headers.get("Authorization"));
    if (!id) return NextResponse.json({ error }, { status });
    const headers = new Headers(req.headers);
    headers.set('x-admin-id', id);
    return NextResponse.next({
        headers
    });
}

export const config = {
    matcher: "/api/:path*",
};
