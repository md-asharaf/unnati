import RedisService from "@/services/redis";
import { PrismaClient } from '@/../generated/prisma';
import { logger } from "./logger";

let prisma: PrismaClient;
let redis: RedisService;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    redis = new RedisService();
} else {
    // @ts-ignore
    if (!global.prisma) {
        // @ts-ignore
        global.prisma = new PrismaClient();
    }
    // @ts-ignore
    if (!global.redis) {
        // @ts-ignore
        global.redis = new RedisService();
    }
    // @ts-ignore
    prisma = global.prisma;
    // @ts-ignore
    redis = global.redis;
}

prisma
    .$connect()
    .then(() => logger.info("[POSTGRES] Connected to DB"))
    .catch((e) => logger.error("[POSTGRES] DB connection error", e));

export {
    prisma as db,
    redis
}
