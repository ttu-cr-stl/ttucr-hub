import { BackButton } from "@/components/utils/BackButton";

export default function SubPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={"relative w-full h-full flex flex-col py-4 mt-14"}>
      <div className="fixed top-0 pt-6 w-full">
        <BackButton />
      </div>
      {children}
    </div>
  );
}
