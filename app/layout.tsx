import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Pulse",
  description: "A simple project management choice game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100 md:flex-row">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
