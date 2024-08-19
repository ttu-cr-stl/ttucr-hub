import NavBar from "@/components/layout/NavBar";


export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-full px-4 scrollbar-hide overflow-y-scroll">
      <div className="pb-24">{children}</div>

      <NavBar />
    </main>
  );
}
