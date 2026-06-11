import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenAcme — The AI Workforce Platform",
  description:
    "Coordinate AI agents, automate workflows, and ship faster with OpenAcme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
