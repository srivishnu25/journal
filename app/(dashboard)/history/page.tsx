import { getAnalyses } from "@/app/lib/actions";
import HistoryChart from "@/app/ui/history/history-card";
import { getUserId } from "@/auth";

const getData = async () => {
  const userId = await getUserId();
  const analyses = await getAnalyses(userId, "asc");
  const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0);
  const avg = Math.round(sum / analyses.length);
  return { analyses, avg };
};

export default async function Page() {
  const { analyses, avg } = await getData();
  return (
    <div className="w-full h-full">
      <div className="text-2xl font-bold">Avg. Sentiment {avg}</div>
      <div className="w-full h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  );
}
