import EntryCards from "@/app/ui/journal/entry-cards";
import NewEntryCard from "@/app/ui/journal/new-entry-card";
import { SkeletonCards } from "@/app/ui/skeletons";
import { getUserId } from "@/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Journal",
};
export default async function Page() {
  const userId = await getUserId();
  return (
    <div className="p-8">
      <div className="flex basis-56 md:basis-[240px] justify-center md:justify-start flex-wrap gap-8 md:gap-10">
        <NewEntryCard userId={userId} />
        <Suspense fallback={<SkeletonCards />}>
          <EntryCards userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}
