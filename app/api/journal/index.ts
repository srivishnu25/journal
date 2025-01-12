// pages/api/journals/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { fetchUserJournalEntries } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth();
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const entries = await fetchUserJournalEntries(session?.user?.id);
  return res.status(200).json(entries);
}
