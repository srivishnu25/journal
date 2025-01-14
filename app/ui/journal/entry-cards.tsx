import { getAnalyses } from "@/app/lib/actions";
import { EntryCard } from "./entry-card";

export default async function EntryCards({ userId }: { userId: string }) {
  const analyses = await getAnalyses(userId);

  return analyses?.map((analysis) => (
    <EntryCard key={analysis.entryId} {...analysis} />
  ));
}
