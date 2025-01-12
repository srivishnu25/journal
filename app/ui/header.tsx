import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import BackButton from "@/app/ui/back-button";

export default async function Header() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return (
    <div className="w-[calc(100%-256px)] h-16 absolute top-0 right-0 z-10 flex items-center justify-between px-8 border-b border-stone-600">
      <div>
        <BackButton />
      </div>
      <div className="flex items-center gap-5">
        <h2>
          Welcome, <strong>{session.user.name}</strong>
        </h2>
        <Image
          src={
            session.user.image ??
            `https://api.dicebear.com/9.x/thumbs/svg?seed=${
              Math.floor(Math.random() * 100000) + 1
            }&randomizeIds=true`
          }
          alt={`${session.user.name}'s profile`}
          width={32}
          height={32}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
