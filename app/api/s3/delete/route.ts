import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { env } from "@/lib/env";
import { s3Client } from "@/lib/s3-client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(req: Request) {
  await requireAdmin();

  try {
    const body = await req.json();
    const key = body.key;

    if (!key) {
      return NextResponse.json(
        { error: "Missing or invalid object key" },
        { status: 400 },
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await s3Client.send(command);

    return NextResponse.json({ message: "Object deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Missing or invalid object key" },
      { status: 500 },
    );
  }
}
