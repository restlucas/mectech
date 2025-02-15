import type { Metadata } from "next";
import "./globals.css";
import { AsideNav } from "@/components/SideNav";

export const metadata: Metadata = {
  title: "CRUD Ginte",
  description: "A simple CRUD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-row h-screen w-full divide-x-2`}>
        <AsideNav />
        <main className="flex-grow p-6 overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
