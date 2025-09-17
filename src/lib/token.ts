import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export type Payload = {
    id: string;
    jti?: string;
    ver?: number;
};

const JWT_SECRET = process.env.JWT_SECRET;

function getSecret(): Uint8Array {
    if (!JWT_SECRET) throw new Error("JWT_SECRET not set");
    return new TextEncoder().encode(JWT_SECRET);
}

const ISSUER = "unnati";
const AUDIENCE = "admin-api";

export async function signToken(payload: Payload, expiresIn: string): Promise<string> {
    return await new SignJWT(payload as JWTPayload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setIssuer(ISSUER)
        .setAudience(AUDIENCE)
        .setExpirationTime(expiresIn)
        .sign(getSecret());
}

export async function generateTokens(payload: Payload) {
    const accessToken = await signToken(payload, "15m");
    const refreshToken = await signToken(payload, "7d");
    return { accessToken, refreshToken };
}

// Verify HS256 JWT (Edge-safe)
export async function verifyToken(token: string): Promise<Payload & JWTPayload> {
    const { payload } = await jwtVerify(token, getSecret(), {
        algorithms: ["HS256"],
        issuer: ISSUER,
        audience: AUDIENCE,
        clockTolerance: 5,
    });
    return payload as Payload & JWTPayload;
}