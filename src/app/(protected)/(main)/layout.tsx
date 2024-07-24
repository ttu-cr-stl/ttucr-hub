import NavBar from "@/components/layout/NavBar";


export const revalidate = 3600; // 1 hour

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative w-full h-[calc(100dvh-4rem)] px-4 pb-8 scrollbar-hide overflow-y-scroll">
      {children}

      <NavBar />
    </main>
  );
}
