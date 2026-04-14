// src/pages/admin/CustomersPage.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockCustomers } from "./_mockCustomers";
import CustomerStatsBar from "./components/customers/CustomerStatsBar";
import CustomerFilters from "./components/customers/CustomerFilters";
import CustomerTable from "./components/customers/CustomerTable";

const INIT_FILTERS = { search: "", status: "", loginMethod: "", sort: "newest" };

export default function CustomersPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [customers, setCustomers] = useState(mockCustomers);

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...customers];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    if (filters.status) {
      const active = filters.status === "active";
      list = list.filter(c => c.isActive === active);
    }
    if (filters.loginMethod) {
      list = list.filter(c => c.loginMethod === filters.loginMethod);
    }

    // Sort
    list.sort((a, b) => {
      switch (filters.sort) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "spent_desc":
          return b.totalSpent - a.totalSpent;
        case "orders_desc":
          return b.totalOrders - a.totalOrders;
        default:
          return new Date(b.createdAt) - new Date(a.createdAt); // newest
      }
    });

    return list;
  }, [customers, filters]);

  // ── Toggle active status (mock) ────────────────────────────────────────────
  const handleToggleStatus = customer => {
    // TODO: gọi API PATCH /customers/:id { isActive: !customer.isActive }
    setCustomers(prev => prev.map(c => (c.id === customer.id ? { ...c, isActive: !c.isActive } : c)));
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Khách hàng</h2>
          <p className="text-xs text-stone-400 mt-0.5">Quản lý tài khoản, xem lịch sử mua hàng và trạng thái khách hàng</p>
        </div>
      </div>

      {/* Stats */}
      <CustomerStatsBar />

      {/* Filters */}
      <CustomerFilters filters={filters} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} total={filtered.length} />

      {/* Table */}
      <CustomerTable customers={filtered} onView={c => navigate(`/admin/customers/detail/${c.id}`)} onToggleStatus={handleToggleStatus} />
    </div>
  );
}
