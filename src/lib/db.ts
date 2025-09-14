import { PrismaClient } from "@/../generated/prisma";
import RedisService from "../services/redis";
import { logger } from "./logger";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    // @ts-ignore
    if (!global.prisma) {
        // @ts-ignore
        global.prisma = new PrismaClient();
    }
    // @ts-ignore
    prisma = global.prisma;
}

export const db = prisma;

db.$connect()
    .then(() => {
        logger.info("[PRISMA] : connected to database");
    })
    .catch((error: any) => {
        logger.error("[PRISMA] : failed to connect database : ", error);
    });

let redis: RedisService;

if (process.env.NODE_ENV === "production") {
    redis = new RedisService();
} else {
    // @ts-ignore
    if (!global.redis) {
        // @ts-ignore
        global.redis = new RedisService();
    }
    // @ts-ignore
    redis = global.redis;
}

export { redis };
