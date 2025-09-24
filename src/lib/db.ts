import RedisService from "@/services/redis";
import { PrismaClient } from '@/../generated/prisma';

declare global {
    var prisma: PrismaClient | undefined;
    var redis: RedisService | undefined;
}

let prisma: PrismaClient;
let redis: RedisService;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    redis = new RedisService();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    if (!global.redis) {
        global.redis = new RedisService();
    }
    prisma = global.prisma;
    redis = global.redis;
}

// Let Prisma lazily connect on first query to avoid build-time connects

export {
    prisma as db,
    redis
}
