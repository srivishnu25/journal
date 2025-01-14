import { getEntryById } from "@/app/lib/data";
import AnalysisBar from "@/app/ui/journal/analysis-bar";
import Editor from "@/app/ui/journal/editor";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const entry = await getEntryById(id);
  if (!entry) redirect("/journal");

  return (
    <>
      <div className="px-8 py-8 h-full w-[calc(100%-280px)]">
        <Editor {...entry} />
      </div>
      <AnalysisBar entryId={entry.id} />
    </>
  );
}
