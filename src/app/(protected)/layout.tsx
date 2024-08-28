import AuthChecker from "@/components/middleware/AuthChecker";
import { RefreshBtn } from "@/components/utils/RefreshBtn";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthChecker>
      <>
        <RefreshBtn />
        {children}
      </>
    </AuthChecker>
  );
}
