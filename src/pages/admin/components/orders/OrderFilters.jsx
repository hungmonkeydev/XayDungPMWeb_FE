// src/pages/admin/components/orders/OrderFilters.jsx

import AdminIcon from "../AdminIcons";

const STATUS_TABS = [
  { value: "", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "confirmed", label: "Xác nhận" },
  { value: "shipping", label: "Đang giao" },
  { value: "completed", label: "Hoàn tất" },
  { value: "cancelled", label: "Đã huỷ" }
];

export default function OrderFilters({ filters, onChange, onReset, total }) {
  const handle = key => e => onChange({ ...filters, [key]: e.target.value });
  const handleDateFrom = e => {
    const value = e.target.value;

    onChange({
      ...filters,
      dateFrom: value,
      dateTo: filters.dateTo && filters.dateTo < value ? "" : filters.dateTo
    });
  };

  const handleDateTo = e => {
    const value = e.target.value;

    // chặn nếu nhỏ hơn dateFrom
    if (filters.dateFrom && value < filters.dateFrom) return;

    onChange({ ...filters, dateTo: value });
  };
  const hasActiveFilter = filters.search || filters.method || filters.dateFrom || filters.dateTo;

  return (
    <div className="space-y-3">
      {/* Status tab bar */}
      <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl w-fit flex-wrap">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => onChange({ ...filters, status: tab.value })}
            className={[
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
              filters.status === tab.value ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search + other filters */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-xs focus-within:border-stone-400 transition-colors">
          <AdminIcon name="search" className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Mã đơn, tên khách hàng..."
            value={filters.search}
            onChange={handle("search")}
            className="bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none w-full"
          />
        </div>

        {/* Payment method */}
        <select
          value={filters.method}
          onChange={handle("method")}
          className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
        >
          <option value="">Tất cả thanh toán</option>
          <option value="VNPay">VNPay</option>
          <option value="COD">COD</option>
        </select>

        {/* Date from */}
        <input
          type="date"
          value={filters.dateFrom}
          max={filters.dateTo || ""}
          onChange={handleDateFrom}
          className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
        />

        {/* Date to */}
        <input
          type="date"
          value={filters.dateTo}
          min={filters.dateFrom || ""}
          onChange={handleDateTo}
          className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
        />

        {/* Reset */}
        {hasActiveFilter && (
          <button onClick={onReset} className="text-xs text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
            Xoá bộ lọc ×
          </button>
        )}

        {/* Result count */}
        <span className="text-xs text-stone-400 ml-auto">
          <span className="font-semibold text-stone-700">{total}</span> đơn hàng
        </span>
      </div>
    </div>
  );
}
