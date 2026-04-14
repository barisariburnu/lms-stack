import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="w-full flex justify-center">
          <X className="size-12 p-2 rounded-full bg-red-500/30 text-red-500" />
        </div>
        <div className="mt-3 text-center sm:mt-5 w-full">
          <h2 className="text-xl font-semibold">Payment Cancelled</h2>
          <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
            No worries, you&apos;ll not be charged. Please try again later.
          </p>
        </div>

        <Link href="/" className={buttonVariants({ className: "w-full mt-5" })}>
          <ArrowLeft className="size-4" />
          Go back to Homepage
        </Link>
      </Card>
    </div>
  );
}
