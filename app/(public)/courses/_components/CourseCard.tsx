"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PublishedCourseType } from "@/app/data/public/get-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { BarChartIcon, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface CourseCardProps {
  data: PublishedCourseType;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function CourseCard({ data }: CourseCardProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const [imgError, setImgError] = useState(!data.fileKey);

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video w-full bg-muted flex items-center justify-center overflow-hidden">
        {imgError ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground mt-4">
            <ImageIcon className="size-10 mb-2 opacity-50" />
            <span className="text-xs font-medium">No Thumbnail</span>
          </div>
        ) : (
          <Image
            src={thumbnailUrl}
            alt={data.title}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-2 right-2 flex gap-2">
          {data.category && (
            <Badge
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm"
            >
              {data.category}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="flex flex-col grow p-4">
        <Link
          href={`/courses/${data.slug}`}
          className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors mb-2"
        >
          {data.title}
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 grow">
          {data.smallDescription}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <BarChartIcon className="size-4" />
            <span>{data.level}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-muted overflow-hidden relative">
              {data.user.image ? (
                <Image
                  src={data.user.image}
                  alt={data.user.name ?? "Instructor"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[10px] text-primary">
                  {data.user.name?.[0]?.toUpperCase() ?? "I"}
                </div>
              )}
            </div>
            <span className="text-sm font-medium">
              {data.user.name ?? "Instructor"}
            </span>
          </div>
          <p className="font-bold text-lg text-primary">
            {formatCurrency(data.price)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
