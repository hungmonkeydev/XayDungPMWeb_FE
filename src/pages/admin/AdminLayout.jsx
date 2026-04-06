// src/pages/admin/AdminLayout.jsx

import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import DashboardPage from "./DashboardPage";
import { ProductsPage, OrdersPage, CustomersPage, PromotionsPage, StaffPage } from "./PlaceholderPage";

const PAGES = {
  dashboard: DashboardPage,
  products: ProductsPage,
  orders: OrdersPage,
  customers: CustomersPage,
  promotions: PromotionsPage,
  staff: StaffPage
};

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const PageComponent = PAGES[activePage] ?? DashboardPage;

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      <AdminSidebar activePage={activePage} onNavigate={setActivePage} collapsed={sidebarCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AdminTopbar activePage={activePage} onToggleSidebar={() => setSidebarCollapsed(v => !v)} />
        <main className="flex-1 overflow-y-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
