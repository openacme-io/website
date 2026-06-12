import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interTight = localFont({
  src: [
    { path: "./fonts/InterTight-latin.woff2", weight: "500 600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter-tight",
});

const inter = localFont({
  src: [
    { path: "./fonts/Inter-latin.woff2", weight: "400 500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-latin.woff2", weight: "400 500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "OpenAcme — Run a 5-person AI team with one operator.",
  description:
    "OpenAcme gives each agent a role, memory, and tools. They coordinate, hand off, and ship. You review results — not steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
