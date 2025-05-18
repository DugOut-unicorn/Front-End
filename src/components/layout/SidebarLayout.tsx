import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <div className="flex flex-row">
      <Outlet />
      <Sidebar />
    </div>
  );
}
