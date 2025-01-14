import { getAnalyses } from "@/app/lib/actions";
import { EntryCard } from "./entry-card";

export default async function EntryCards() {
  const analyses = await getAnalyses();

  return analyses?.map((analysis) => (
    <EntryCard key={analysis.entryId} {...analysis} />
  ));
}
