import { ProtectedPage } from "@/components/ProtectedPage";
import { Navigation } from "@/components/Navigation";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <div className={`antialiased flex flex-col min-[900px]:flex-row h-screen w-full divide-x-2`}>
        <Navigation />
        <main className="flex-grow p-6 overflow-x-hidden">{children}</main>
      </div>
    </ProtectedPage>
  );
}
