import NavBar from "@/components/layout/NavBar";


export const revalidate = 1200; // 20 minutes

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-dvh px-4 scrollbar-hide overflow-y-scroll">
      <div className="pb-24">{children}</div>

      <NavBar />
    </main>
  );
}
