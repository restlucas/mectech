import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";

export const metadata: Metadata = {
    title: "CRUD Ginte",
    description: "A simple CRUD",
};
  
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <html lang="en">
        <body>
            {children}
        </body>
      </html>
    </AppProviders>
  );
}
