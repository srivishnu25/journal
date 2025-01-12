import { getEntries } from "@/app/lib/actions";
import { EntryCard } from "./entry-card";

export default async function EntryCards() {
  const entries = await getEntries();

  return entries?.map((entry) => <EntryCard key={entry.id} {...entry} />);
}
