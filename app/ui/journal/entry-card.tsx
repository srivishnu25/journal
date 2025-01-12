"use client";
import { deleteEntry } from "@/app/lib/actions";
import { formatDateToLocal } from "@/app/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { JournalEntry } from "@prisma/client";
import { useRouter } from "next/navigation";

export function EntryCard(entry: JournalEntry) {
  const router = useRouter();
  const formattedDate = formatDateToLocal(entry.createdAt.toString());
  return (
    <div
      onClick={() => {
        router.push(`journal/${entry.id}`);
      }}
      className="w-60 aspect-square flex flex-col items-center justify-center group/entry-card relative cursor-pointer rounded-md bg-gray-950 shadow-xl shadow-slate-200/10 text-slate-100 text-2xl p-4 scale-100 hover:scale-110 transition-all duration-200"
    >
      <div className="max-w-48 truncate">{entry.content}</div>

      <div className="">Mood:</div>
      <div className="">{formattedDate}</div>
      <span
        className="w-5 h-5 absolute -right-2 -top-2 opacity-0 group-hover/entry-card:opacity-100"
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await deleteEntry(entry.id);
        }}
      >
        <XMarkIcon width={20} height={20} />
      </span>
    </div>
  );
}
