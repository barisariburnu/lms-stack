import { useEffect } from "react";
import Link from "next/link";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeft, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Page() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="w-full flex justify-center">
          <Check className="size-12 p-2 rounded-full bg-green-500/30 text-green-500" />
        </div>
        <div className="mt-3 text-center sm:mt-5 w-full">
          <h2 className="text-xl font-semibold">Payment Successful</h2>
          <p className="text-sm mt-2 text-muted-foreground tracking-tight text-balance">
            Thank you for your purchase! You&apos;ll now have access to the
            course.
          </p>
        </div>

        <Link
          href="/dashboard"
          className={buttonVariants({ className: "w-full mt-5" })}
        >
          <ArrowLeft className="size-4" />
          Go back to Dashboard
        </Link>
      </Card>
    </div>
  );
}
