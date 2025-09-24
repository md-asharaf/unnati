import { NextResponse } from "next/server";
import { db, redis } from "@/lib/db";

export async function GET() {
  const result: any = { db: false, redis: false };
  try {
    await db.$queryRaw`SELECT 1`;
    result.db = true;
  } catch {}

  try {
    const key = `health:${Date.now()}`;
    await redis.setValue(key, "ok", 5);
    result.redis = true;
  } catch {}

  const ok = result.db && result.redis;
  return NextResponse.json({ ok, ...result }, { status: ok ? 200 : 503 });
}
