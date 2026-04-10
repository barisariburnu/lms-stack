import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { s3Client } from "@/lib/s3-client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, "File name is required"),
  contentType: z.string().min(1, "Content type is required"),
  size: z.number().min(1, "File size is required"),
  isImage: z.boolean().default(false),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = fileUploadSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid file data" }, { status: 400 });
    }

    const { fileName, contentType, size } = validation.data;

    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 360, // URL expires in 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate presigned URL" },
      { status: 500 },
    );
  }
}
