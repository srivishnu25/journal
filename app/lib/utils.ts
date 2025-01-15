import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const INITIAL_ANALYSIS = {
  mood: "reflective",
  subject: "daily life",
  negative: false,
  summary: "Wrote a journal entry about my day",
  color: "#87ceeb",
  sentimentScore: 5,
};

export function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs));
}
