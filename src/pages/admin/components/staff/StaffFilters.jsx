// src/pages/admin/components/staff/StaffFilters.jsx

import AdminIcon from "../AdminIcons";

export default function StaffFilters({ filters, onChange, onReset, total }) {
  const handle = key => e => onChange({ ...filters, [key]: e.target.value });
  const hasActiveFilter = filters.search || filters.type || filters.status || filters.loginMethod;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm focus-within:border-stone-400 transition-colors">
        <AdminIcon name="search" className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Tên hoặc email nhân viên..."
          value={filters.search}
          onChange={handle("search")}
          className="bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none w-full"
        />
      </div>

      {/* Type */}
      <select
        value={filters.type}
        onChange={handle("type")}
        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
      >
        <option value="">Tất cả loại</option>
        <option value="Admin">Admin</option>
        <option value="Staff">Staff</option>
      </select>

      {/* Status */}
      <select
        value={filters.status}
        onChange={handle("status")}
        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
      >
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang hoạt động</option>
        <option value="inactive">Vô hiệu hoá</option>
      </select>

      {/* Login method */}
      <select
        value={filters.loginMethod}
        onChange={handle("loginMethod")}
        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
      >
        <option value="">Tất cả đăng nhập</option>
        <option value="google">Google</option>
        <option value="email">Email</option>
      </select>

      {/* Reset */}
      {hasActiveFilter && (
        <button onClick={onReset} className="text-xs text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
          Xoá bộ lọc ×
        </button>
      )}

      <span className="text-xs text-stone-400 ml-auto">
        <span className="font-semibold text-stone-700">{total}</span> nhân viên
      </span>
    </div>
  );
}
