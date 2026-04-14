"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  ArrowRight,
  Eye,
  ImageIcon,
  MoreVertical,
  Pencil,
  School,
  TimerIcon,
  Trash,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminCourseCardProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: AdminCourseCardProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  const [imgError, setImgError] = useState(!data.fileKey);

  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <Pencil className="size-4 mr-2" /> Edit Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/courses/${data.slug}`}>
                <Eye className="size-4 mr-2" /> Preview Course
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Trash className="size-4 mr-2 text-destructive" /> Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative aspect-video w-full bg-muted flex items-center justify-center">
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
            className="w-full rounded-t-lg aspect-video h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>
      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${data.id}`}
          className="font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors"
        >
          {data.title}
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-tight mt-2">
          {data.smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <TimerIcon className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.duration}h</p>
          </div>
          <div className="flex items-center gap-x-2">
            <School className="size-6 p-1 rounded-md text-primary bg-primary/10" />
            <p className="text-sm text-muted-foreground">{data.level}</p>
          </div>
        </div>

        <Link
          href={`/admin/courses/${data.id}/edit`}
          className={buttonVariants({
            className: "w-full mt-4",
          })}
        >
          Edit Course <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="size-8 rounded-md" />
      </div>
      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-lg aspect-video h-[250px] object-cover" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="w-3/4 mb-2 h-6 rounded" />
        <Skeleton className="w-full h-4 mb-4 rounded" />
        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 p-1 rounded-md" />
            <Skeleton className="w-10 h-4 rounded" />
          </div>
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 p-1 rounded-md" />
            <Skeleton className="w-10 h-4 rounded" />
          </div>
        </div>
        <Skeleton className="w-full h-10 mt-4 rounded" />
      </CardContent>
    </Card>
  );
}
