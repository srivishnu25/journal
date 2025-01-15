import Link from "next/link";
import NavLinks from "@/app/ui/journal/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import JournalLogo from "../journal-logo";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-6 pt-[72px] md:py-3 md:px-2 md:border-r md:border-stone-600">
      <Link
        className="hidden md:flex mb-2 h-16 items-center justify-start rounded-md"
        href="/"
      >
        <div className="w-32 md:w-40">
          <JournalLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
