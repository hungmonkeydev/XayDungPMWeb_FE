// src/pages/admin/OrdersPage.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useOrders from "../../hooks/useOrdersAdmin";

import OrderStatsBar from "./components/orders/OrderStatsBar";
import OrderFilters from "./components/orders/OrderFilters";
import OrderTable from "./components/orders/OrderTable";

const INIT_FILTERS = {
  search: "",
  status: "",
  method: "",
  dateFrom: "",
  dateTo: ""
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INIT_FILTERS);

  const { orders } = useOrders(); // 🔥 dùng API

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!o.code.toLowerCase().includes(q) && !o.customerName.toLowerCase().includes(q) && !o.customerPhone.includes(q)) return false;
      }

      if (filters.status && o.status !== filters.status) return false;
      if (filters.method && o.method !== filters.method) return false;

      if (filters.dateFrom) {
        if (new Date(o.createdAt) < new Date(filters.dateFrom)) return false;
      }

      if (filters.dateTo) {
        const to = new Date(filters.dateTo);
        to.setHours(23, 59, 59);
        if (new Date(o.createdAt) > to) return false;
      }

      return true;
    });
  }, [orders, filters]);

  /* ───────── UI ───────── */
  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Đơn hàng</h2>
          <p className="text-xs text-stone-400 mt-0.5">Theo dõi, xác nhận và cập nhật trạng thái đơn hàng</p>
        </div>
      </div>

      {/* Stats */}
      <OrderStatsBar orders={orders} />

      {/* Filters */}
      <OrderFilters filters={filters} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} total={filtered.length} />

      {/* Table */}
      <OrderTable orders={filtered} onView={order => navigate(`/admin/orders/${order.id}`)} />
    </div>
  );
}
