import jwt from "jsonwebtoken";
export type Payload = {
    id: string;
};
const JWT_SECRET = process.env.JWT_SECRET;
export const signToken = (payload: Payload, expiresIn: string = "7d") => {
    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: expiresIn as any,
    });
};

export const generateTokens = (payload: Payload) => {
    const accessToken = signToken(payload, "15m");
    const refreshToken = signToken(payload, "7d");
    return {
        accessToken,
        refreshToken,
    };
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET as string) as Payload;
};