import AuthChecker from "@/components/middleware/AuthChecker";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthChecker>{children}</AuthChecker>;
}
