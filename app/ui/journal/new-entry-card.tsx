import { createNewEntry } from "@/app/lib/actions";

export default function NewEntryCard({ userId }: { userId: string }) {
  return (
    <button
      onClick={async () => {
        "use server";
        await createNewEntry(userId);
      }}
      className="w-full md:w-60 md:aspect-square rounded-md bg-gray-950 shadow-xl shadow-slate-200/10 text-slate-100 text-2xl scale-100 hover:scale-110 transition-all duration-200 p-4"
    >
      New Entry
    </button>
  );
}
