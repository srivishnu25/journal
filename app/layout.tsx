import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/ui/fonts";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    template: "%s | Journal",
    default: "Journal",
  },
  description:
    "An AI-powered journaling app that helps you track your thoughts, analyze moods, and gain insights for better mental well-being.",
  metadataBase: new URL("https://journal-tau-kohl.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
