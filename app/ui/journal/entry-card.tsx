"use client";
import { deleteEntry } from "@/app/lib/actions";
import { formatDateToLocal } from "@/app/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Analysis } from "@prisma/client";
import { useRouter } from "next/navigation";

export function EntryCard(analysis: Analysis) {
  const router = useRouter();
  const formattedDate = formatDateToLocal(analysis.createdAt.toString());
  return (
    <div
      onClick={() => {
        router.push(`journal/${analysis.entryId}`);
      }}
      className="w-60 aspect-square flex flex-col gap-4 items-center justify-center group/analysis-card relative cursor-pointer rounded-md bg-gray-950 shadow-xl shadow-slate-200/10 text-slate-100 p-4 scale-100 hover:scale-110 transition-all duration-200"
    >
      <div
        title={analysis.subject}
        className="max-w-48 truncate text-2xl capitalize"
      >
        {analysis.subject}
      </div>

      <div className="text-base">
        Mood:&nbsp;
        <span className="uppercase tracking-wider"> {analysis.mood}</span>
      </div>
      <div className="text-sm text-white/60">{formattedDate}</div>
      <span
        className="w-5 h-5 absolute -right-2 -top-2 opacity-0 group-hover/analysis-card:opacity-100"
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await deleteEntry(analysis.entryId);
        }}
      >
        <XMarkIcon width={20} height={20} />
      </span>
    </div>
  );
}
