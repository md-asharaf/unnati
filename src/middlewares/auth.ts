import { verifyToken } from "../lib/token";

export const requireAdmin = async (authHeader: string | null) => {
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;

    if (!token) {
        return { error: "Unauthorized", status: 401 };
    }
    try {
        var decodedToken = await verifyToken(token);
    } catch (err) {
        return { error: "Invalid or expired token", status: 401 };
    }
    return { id: decodedToken.id };
}
