"use server";

import {
  addJournalEntry,
  deleteJournalEntry,
  fetchUserJournalEntries,
  updateJournalEntry,
  getEntryById,
  addAnalysis,
  updateAnalysis,
  getAnalysisById,
} from "./data";
import { redirect } from "next/navigation";
import { getUserId } from "@/auth";
import { revalidatePath } from "next/cache";
import { analyze } from "./ai";
import prisma from "@/app/lib/prisma";

export async function createNewEntry() {
  const userId = await getUserId();

  const entry = await addJournalEntry(userId, "Write about your day!");
  const analysis = await analyze(entry.content);
  await addAnalysis({ entryId: entry.id, userId, ...analysis });
  revalidatePath("/journal");
  redirect(`/journal/${entry.id}`);
}

export async function getEntries() {
  const userId = await getUserId();
  return await fetchUserJournalEntries(userId);
}

export async function deleteEntry(entryId: string) {
  await deleteJournalEntry(entryId);
  revalidatePath("/journal");
}

export async function updateEntry(entryId: string, content: string) {
  const updatedEntry = await updateJournalEntry(entryId, content);
  if (!updatedEntry) return null;
  const analysis = await analyze(updatedEntry?.content ?? "");
  await updateAnalysis({ entryId, userId: updatedEntry.userId, ...analysis });
  revalidatePath(`/journal/${updatedEntry.id}`);
  return updatedEntry;
}

export async function getEntry(entryId: string) {
  const entry = await getEntryById(entryId);
  return entry;
}

export async function getAnalysis(entryId: string) {
  return await getAnalysisById(entryId);
}

export async function updateEntryOptimized(
  entryId: string,
  userId: string,
  content: string
) {
  // Run the journal update and AI analysis concurrently
  const analysisPromise = analyze(content);

  const analysis = await analysisPromise;

  if (analysis) {
    // Use a Prisma transaction to batch the database updates
    const transactionResult = await prisma.$transaction([
      // Update the journal entry content
      prisma.journalEntry.update({
        where: { id: entryId },
        data: { content },
      }),

      // Upsert the analysis data
      prisma.analysis.upsert({
        where: { entryId },
        create: { entryId, userId, ...analysis },
        update: { ...analysis },
      }),
    ]);

    // Revalidate path after transaction
    revalidatePath(`/journal/${entryId}`);

    // Return the updated journal entry
    return transactionResult[0]; // The first element in the transaction corresponds to the journal update result
  }

  return null; // Handle cases where analysis fails
}
