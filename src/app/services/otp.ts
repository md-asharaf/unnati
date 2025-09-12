import { redis } from "@/app/lib/db";
import mailService from "./email";
import { logger } from "../lib/logger";
class OTPservice {
    generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendOtp(email: string) {
        try {
            const otp = this.generateCode();

            await redis.setValue(`otp:${email}`, otp, 180);
            logger.debug("[OTP_SERVICE] OTP stored in Redis", {
                email: email,
                expirySeconds: 180,
            });

            await mailService.sendEmail(
                email,
                "OTP Verification",
                `Your OTP is ${otp}`,
            );
            return {
                status: true,
                message: "OTP sent successfully",
                otp: otp,
            };
        } catch (error: any) {
            if (error.name === "ZodError") {
                const errorMessages = error.errors.map(
                    (err: any) => `${err.path.join(".")}: ${err.message}`,
                );
                return {
                    status: false,
                    message: `Validation failed: ${errorMessages.join(", ")}`,
                };
            }
            return {
                status: false,
                message: error.message || "Failed to send OTP",
            };
        }
    }

    async verifyOtp(email: string, otp: string) {
        try {
            logger.info("[OTP_SERVICE] Verifying OTP", { email });

            const storedOtp = await redis.getValue(`otp:${email}`);

            if (!storedOtp) {
                logger.warn(
                    "[OTP_SERVICE] OTP verification failed - expired or not sent",
                    { email },
                );
                throw new Error("OTP expired or not sent");
            }

            if (otp === storedOtp) {
                await redis.deleteValue(`otp:${email}`);
                logger.info("[OTP_SERVICE] OTP verified successfully", {
                    email,
                });
                return {
                    status: true,
                    message: "OTP verified successfully",
                };
            }

            logger.warn(
                "[OTP_SERVICE] OTP verification failed - invalid code",
                {
                    email,
                },
            );
            return {
                status: false,
                message: "Invalid OTP",
            };
        } catch (error: any) {
            if (error.name === "ZodError") {
                const errorMessages = error.errors.map(
                    (err: any) => `${err.path.join(".")}: ${err.message}`,
                );
                return {
                    status: false,
                    message: `Validation failed: ${errorMessages.join(", ")}`,
                };
            }

            return {
                status: false,
                message: error.message || "Failed to verify OTP",
            };
        }
    }

    async deleteOtp(email: string) {
        try {
            await redis.deleteValue(`otp:${email}`);
            return {
                status: true,
                message: "OTP deleted successfully",
            };
        } catch (error: any) {
            if (error.name === "ZodError") {
                const errorMessages = error.errors.map(
                    (err: any) => `${err.path.join(".")}: ${err.message}`,
                );
                return {
                    status: false,
                    message: `Validation failed: ${errorMessages.join(", ")}`,
                };
            }
            return {
                status: false,
                message: error.message || "Failed to delete OTP",
            };
        }
    }
}
export default new OTPservice();
