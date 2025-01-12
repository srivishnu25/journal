import { getAnalysis } from "@/app/lib/actions";

// export default async function AnalysisBar({ entryId }: { entryId: string }) {
//   const analysis = await getAnalysis(entryId);
//   console.log("analysis", analysis);
//   return (
//     <div className="border-stone-600 border-l w-[280px] h-full absolute top-16 right-0">
//       Analysis bar
//     </div>
//   );
// }

export default async function AnalysisBar({ entryId }: { entryId: string }) {
  const analysis = await getAnalysis(entryId);

  if (!analysis) return <div>No analysis available</div>;

  const { mood, color, subject, summary } = analysis;

  return (
    <div className="border-stone-600 border-l w-[280px] h-full absolute top-16 right-0 bg-black text-white">
      {/* Mood Section */}
      <div
        className="flex items-center justify-center p-4 text-2xl font-bold rounded-t-md"
        style={{ backgroundColor: color }}
      >
        {mood.charAt(0).toUpperCase() + mood.slice(1)}
      </div>

      {/* Subject Section */}
      <div className="p-4 border-b border-stone-600">
        <h3 className="text-xl font-semibold">{subject}</h3>
      </div>

      {/* Summary Section */}
      <div className="p-4">
        <p className="text-sm text-stone-400">{summary}</p>
      </div>
    </div>
  );
}
