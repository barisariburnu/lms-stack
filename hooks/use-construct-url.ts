import { env } from "@/lib/env";

export function useConstructUrl(fileKey: string): string {
  return `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.s3.${env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;
}
