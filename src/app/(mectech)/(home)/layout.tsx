import { TopNavigation } from "@/components/TopNavigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-screen relative">
      <TopNavigation />

      {children}
    </main>
  );
}
