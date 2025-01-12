"use client";

import { updateEntry, updateEntryOptimized } from "@/app/lib/actions";
import { JournalEntry } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Editor({
  id,
  content: initialContent,
  userId,
}: JournalEntry) {
  // Local state to manage the content for instant UI updates
  const [content, setContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Debounced function to update the server
  const handleEntryUpdate = useDebouncedCallback(async (content: string) => {
    try {
      await updateEntryOptimized(id, userId, content);
    } catch (error) {
      console.error("Failed to update entry:", error);
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value;
    setContent(updatedContent); // Update local state immediately
    handleEntryUpdate(updatedContent); // Trigger debounced server update
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(content.length, content.length);
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      placeholder="Write about your day!"
      className="bg-transparent outline-none w-full h-full resize-none text-xl"
      value={content}
      onChange={handleChange}
    />
  );
}
