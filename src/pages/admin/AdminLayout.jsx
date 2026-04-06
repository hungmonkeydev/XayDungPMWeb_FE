// src/pages/admin/AdminLayout.jsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import DashboardPage from "./DashboardPage";

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      <AdminSidebar collapsed={sidebarCollapsed} />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AdminTopbar onToggleSidebar={() => setSidebarCollapsed(v => !v)} />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
