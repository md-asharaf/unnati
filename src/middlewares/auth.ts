import { verifyToken } from "../lib/token";
import { cookies } from "next/headers";

export const requireAdmin = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        return { error: "Unauthorized", status: 401 };
    }
    let payload;
    try {
        payload = await verifyToken(accessToken);
    } catch {
        return { error: "Invalid or expired token", status: 401 };
    }
    return { id: payload.id };
}
