import { BackButton } from "@/components/utils/BackButton";

export default function SubPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={"relative w-full h-full flex flex-col py-4 mt-14"}>
      <div className="fixed top-0 pt-5 -ml-4 px-4 py-2 w-full bg-white">
        <BackButton />
      </div>
      {children}
    </div>
  );
}
