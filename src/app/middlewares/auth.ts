import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../lib/token";
import { db } from "../lib/db";
export function authMiddleware(handler: Function) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7)
            : null;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const { id } = verifyToken(token) as { id: string };

        const admin = await db.admin.findUnique({
            where: { id },
        });
        // @ts-ignore
        req.admin = admin;

        return handler(req, res);
    };
}
