// src/pages/admin/DashboardPage.jsx

import StatCard from "./components/dashboard/StatCard";
import RevenueChart from "./components/dashboard/RevenueChart";
import OrderStatusChart from "./components/dashboard/OrderStatusChart";
import RecentOrders from "./components/dashboard/RecentOrders";
import TopProducts from "./components/dashboard/TopProducts";
import { dashboardStats } from "./_mockData";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {dashboardStats.map(s => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <OrderStatusChart />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </div>
  );
}
