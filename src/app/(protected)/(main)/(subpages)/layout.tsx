import { BackButton } from "@/components/utils/BackButton";

export default function SubPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={"relative w-full h-full flex flex-col overflow-x-visible"}>
      <div className="fixed top-0 pt-6 w-full z-50">
        <BackButton />
      </div>
      {children}
    </div>
  );
}
