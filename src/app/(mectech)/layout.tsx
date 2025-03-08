import { AsideNavigation } from "@/components/AsideNavigation";

export default function MectechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AsideNavigation />
      <main className="flex-grow px-12 min-[1600px]:px-24 overflow-x-hidden">
        {children}
      </main>
    </>
  );
}
