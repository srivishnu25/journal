import EntryCards from "@/app/ui/journal/entry-cards";
import NewEntryCard from "@/app/ui/journal/new-entry-card";
import { SkeletonCards } from "@/app/ui/skeletons";
import { getUserId } from "@/auth";
import { Suspense } from "react";

export default async function Page() {
  const userId = await getUserId();
  return (
    <div className="p-8">
      <div className="grid grid-cols-[repeat(2,minmax(0,240px))] md:grid-cols-[repeat(4,minmax(0,240px))] gap-10">
        <NewEntryCard userId={userId} />
        <Suspense fallback={<SkeletonCards />}>
          <EntryCards userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}
