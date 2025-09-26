import { v2 as cloudinary } from "cloudinary";
import { logger } from "@/lib/logger";

class UploadService {
  private client;
  constructor(cloudName: string, apiKey: string, apiSecret: string) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    this.client = cloudinary;
  }

  uploadBuffer = async (
    buffer: Buffer,
    mimetype: string,
    resource_type: string = "image",
  ): Promise<{ url: string; id: string }> => {
    return new Promise((resolve, reject) => {
      const stream = this.client.uploader.upload_stream(
        {
          resource_type: resource_type as "image" | "video" | "raw" | "auto",
          format: mimetype.split("/")[1],
        },
        (error, result) => {
          if (error) {
            logger.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            logger.info("Cloudinary upload success:", {
              url: result?.url,
              id: result?.public_id,
            });
            resolve({ url: result?.secure_url!, id: result?.public_id! });
          }
        },
      );
      stream.on("error", (err) => {
        logger.error("Cloudinary stream error:", err);
        reject(err);
      });
      stream.end(buffer);
    });
  };

  delete = async (public_id: string) => {
    try {
      if (!public_id) {
        logger.warn("No public_id provided for Cloudinary deletion.");
        throw new Error("No public_id provided for deletion.");
      }
      const response = await this.client.uploader.destroy(public_id);
      logger.info("Cloudinary delete response:", response);
      if (response.result !== "ok") {
        logger.error("Cloudinary delete failed:", response);
        throw new Error(`Cloudinary delete failed: ${response.result}`);
      }
      return response;
    } catch (error: any) {
      logger.error("Cloudinary delete error:", error);
      throw new Error(
        error.message || "Unknown error during Cloudinary deletion.",
      );
    }
  };
}

const uploadService = new UploadService(
  process.env.CLOUDINARY_CLOUD_NAME as string,
  process.env.CLOUDINARY_API_KEY as string,
  process.env.CLOUDINARY_API_SECRET as string,
);

export default uploadService;
