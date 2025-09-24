import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middlewares/auth";

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function middleware(req: NextRequest) {
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  }
  let response;
  if (req.method === "GET") {
    response = NextResponse.next();
  } else {
    const { error, status } = await requireAdmin();
    if (error) {
      response = NextResponse.json({ error }, { status });
    } else {
      response = NextResponse.next();
    }
  }
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const config = {
  matcher: "/api/((?!auth).*)",
};
