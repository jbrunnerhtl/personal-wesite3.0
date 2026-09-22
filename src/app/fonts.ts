import { Geist, Geist_Mono } from "next/font/google";

// Shared by the [lang] root layout and global-not-found.tsx (which bypasses that layout).
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fontClasses = `${geistSans.variable} ${geistMono.variable} antialiased`;
