import prisma from "@/app/lib/prisma";
import { Analysis, JournalEntry, User } from "@prisma/client";

// Fetch all journal entries for a specific user
export async function fetchUserJournalEntries(
  userId: string
): Promise<JournalEntry[]> {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return entries;
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    throw new Error("Failed to fetch journal entries.");
  }
}

// Add a new journal entry
export async function addJournalEntry(
  userId: string,
  content: string
): Promise<JournalEntry> {
  try {
    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        content,
      },
    });
    return entry;
  } catch (error) {
    console.error("Error adding journal entry:", error);
    throw new Error("Failed to add journal entry.");
  }
}

// Update an existing journal entry
export async function updateJournalEntry(
  entryId: string,
  content: string
): Promise<JournalEntry | null> {
  try {
    console.log("content,entryId", content, entryId);
    const entry = await prisma.journalEntry.update({
      where: { id: entryId },
      data: { content },
    });
    return entry;
  } catch (error) {
    console.error("Error updating journal entry:", error);
    throw new Error("Failed to update journal entry.");
  }
}

// Delete a journal entry
export async function deleteJournalEntry(
  entryId: string
): Promise<{ message: string }> {
  try {
    await prisma.journalEntry.delete({
      where: { id: entryId },
    });
    console.log("called");
    return { message: "Deleted Journal entry" };
  } catch (error) {
    // console.error("Error deleting journal entry:", error);
    return {
      message: "Error deleting journal entry:",
    };
  }
}

// User related functions using Prisma
export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user by ID.");
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user by email.");
  }
}

// Fetch a specific journal entry by ID
export async function getEntryById(
  entryId: string
): Promise<JournalEntry | null> {
  try {
    const entry = await prisma.journalEntry.findUnique({
      where: { id: entryId },
    });
    return entry;
  } catch (error) {
    console.error("Error fetching journal entry by ID:", error);
    throw new Error("Failed to fetch journal entry by ID.");
  }
}

// Add or update an analysis entry
export async function updateAnalysis({
  entryId,
  userId,
  ...sharedFields
}: Omit<Analysis, "id" | "createdAt" | "updatedAt">): Promise<Analysis> {
  try {
    const analysis = await prisma.analysis.upsert({
      where: {
        entryId,
      },
      update: {
        ...sharedFields,
      },
      create: {
        entryId,
        userId,
        ...sharedFields,
      },
    });
    return analysis;
  } catch (error) {
    console.error("Error upserting analysis entry:", error);
    throw new Error("Failed to upsert analysis entry.");
  }
}

// Add a new analysis entry
export async function addAnalysis({
  entryId,
  userId,
  ...sharedFields
}: Omit<Analysis, "id" | "createdAt" | "updatedAt">): Promise<Analysis> {
  try {
    const analysis = await prisma.analysis.create({
      data: {
        entryId,
        userId,
        ...sharedFields,
      },
    });
    return analysis;
  } catch (error) {
    console.error("Error adding analysis entry:", error);
    throw new Error("Failed to add analysis entry.");
  }
}

// Fetch analysis for a specific journal entry by entryId
export async function getAnalysisById(
  entryId: string
): Promise<Analysis | null> {
  try {
    const analysis = await prisma.analysis.findUnique({
      where: { entryId },
    });
    return analysis;
  } catch (error) {
    console.error("Error fetching analysis by entry ID:", error);
    throw new Error("Failed to fetch analysis by entry ID.");
  }
}

// Fetch all analyses for a specific user
export async function getAnalysesByUserId(userId: string): Promise<Analysis[]> {
  try {
    const analyses = await prisma.analysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return analyses;
  } catch (error) {
    console.error("Error fetching analyses by user ID:", error);
    throw new Error("Failed to fetch analyses by user ID.");
  }
}
