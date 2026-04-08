"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Signed out successfully");
        },
        onError: (error) => {
          toast.error(error.error?.message || "Something went wrong");
        },
      },
    });
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {session ? (
              <div className="flex items-center gap-2">
                <h1>{session.user.name}</h1>
                <Button onClick={signOut}>Logout</Button>
              </div>
            ) : (
              <Button onClick={() => router.push("/login")}>Login</Button>
            )}
          </h1>
        </div>
      </main>
    </div>
  );
}
