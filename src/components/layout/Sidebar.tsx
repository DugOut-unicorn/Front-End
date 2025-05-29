import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="h-[calc(100vh-4rem)] w-100 border-l border-[var(--divider-dv2)] bg-[var(--surface-1)]">
      {children}
    </div>
  );
};

export default Sidebar;
