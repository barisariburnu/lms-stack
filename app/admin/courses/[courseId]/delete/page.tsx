import { useTransition } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteCourse } from "./actions";

export default function Page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { courseId } = useParams<{ courseId: string }>();

  const onSubmit = async () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
      }

      if (result?.status === "success") {
        toast.success(result.message);
        router.push("/admin/courses");
      } else if (result?.status === "error") {
        toast.error(result.message);
      }
    });
  };
  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>This action cannot be undone.</CardTitle>
          <CardDescription>
            Are you sure you want to delete this course?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Link
            href="/admin/courses"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
