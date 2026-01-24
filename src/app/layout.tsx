import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"; // Import localFont loader
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// 1. Setup Geist (Keep for general UI/fallbacks)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Setup Diamond Grotesk (Primary Headings)
const diamond = localFont({
  src: "./fonts/diamondgrotesk.ttf", // Ensure file is in src/app/fonts/
  variable: "--font-diamond",
  display: "swap",
});

// 3. Setup Space Rabbit (Secondary/Creative Text)
const space = localFont({
  src: "./fonts/spacerabbit.otf", // Ensure file is in src/app/fonts/
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darlight Studio",
  description: "Portfolio of Darlight Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Add the new variables here so Tailwind can see them
        className={`${geistSans.variable} ${geistMono.variable} ${diamond.variable} ${space.variable} antialiased bg-[#f8f8f8]`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}