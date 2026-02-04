import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default class FileService {
  private s3: S3Client;

  constructor() {
    const requiredEnvVars = [
      "AWS_REGION",
      "AWS_ACCESS_KEY_ID",
      "AWS_SECRET_ACCESS_KEY_ID",
      "AWS_BUCKET_NAME",
    ];

    const missingVars = requiredEnvVars.filter(
      (varName) => !process.env[varName],
    );

    if (missingVars.length > 0) {
      throw new Error(
        `Configurações do S3 ausentes no .env: ${missingVars.join(", ")}`,
      );
    }

    this.s3 = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID!,
      },
    });
  }

  async getPresignedUrl(fileName: string, fileType: string, sessionId: string) {
    const uniqueName = `${fileName}_${Date.now()}`;
    const fileKey = `${sessionId}/${uniqueName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 });

    const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const fileRecord = await prisma.file.create({
      data: {
        originalName: fileName,
        savedName: uniqueName,
        fileSize: 0,
        path: s3Url,
        key: fileKey,
        sessionId: sessionId,
      },
    });

    return { uploadUrl, fieldId: fileRecord.id };
  }

  async getDownloadUrl(fileKey: string, originalName: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      ResponseContentDisposition: `attachment; filename="${encodeURIComponent(originalName)}"`,
    });

    return await getSignedUrl(this.s3, command, { expiresIn: 900 });
  }
}
