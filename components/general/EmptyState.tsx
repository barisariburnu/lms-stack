import Link from "next/link";
import { Ban, PlusCircle } from "lucide-react";
import { buttonVariants } from "../ui/button";

interface PageEmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export function PageEmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: PageEmptyStateProps) {
  return (
    <div className="flex flex-col flex-1 items-center h-full rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 mb-4">
        <Ban className="size-10 text-primary" />
      </div>
      <div className="text-center">
        <h2 className="mt-6 text-6xl font-semibold">{title}</h2>
        <p className="mb-8 mt-2 text-center text-sm text-muted-foreground">
          {description}
        </p>
        {buttonText && buttonLink && (
          <Link href={buttonLink} className={buttonVariants()}>
            <PlusCircle className="size-4 mr-2" />
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
