// src/pages/admin/components/promotions/PromotionFilters.jsx

import AdminIcon from "../AdminIcons";

const STATUS_TABS = [
  { value: "", label: "Tất cả" },
  { value: "active", label: "Đang chạy" },
  { value: "expiring", label: "Sắp hết hạn" },
  { value: "upcoming", label: "Sắp diễn ra" },
  { value: "expired", label: "Đã kết thúc" }
];

export default function PromotionFilters({ filters, onChange, onReset, total }) {
  const handle = key => e => onChange({ ...filters, [key]: e.target.value });
  const hasActiveFilter = filters.search || filters.type;

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

      {/* Search + type */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm focus-within:border-stone-400 transition-colors">
          <AdminIcon name="search" className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Tên, mã code khuyến mãi..."
            value={filters.search}
            onChange={handle("search")}
            className="bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none w-full"
          />
        </div>

        <select
          value={filters.type}
          onChange={handle("type")}
          className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
        >
          <option value="">Tất cả loại</option>
          <option value="percentage">Phần trăm (%)</option>
          <option value="fixed">Số tiền cố định (₫)</option>
        </select>

        {hasActiveFilter && (
          <button onClick={onReset} className="text-xs text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
            Xoá bộ lọc ×
          </button>
        )}

        <span className="text-xs text-stone-400 ml-auto">
          <span className="font-semibold text-stone-700">{total}</span> khuyến mãi
        </span>
      </div>
    </div>
  );
}
