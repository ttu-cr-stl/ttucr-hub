import { ReactNode } from "react";

export const SettingsItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => any;
}) => (
  <div
    onClick={onClick}
    className="flex justify-between items-center w-full h-12 rounded-lg bg-white pl-4 pr-1 text-xl shadow-sm"
  >
    {children}
  </div>
);
