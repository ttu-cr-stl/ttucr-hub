import NavBar from "@/components/layout/NavBar";
import AuthChecker from "@/components/middleware/AuthChecker";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthChecker>
      <main className="relative w-full h-full px-4">
        {children}

        <NavBar />
      </main>
    </AuthChecker>
  );
}
