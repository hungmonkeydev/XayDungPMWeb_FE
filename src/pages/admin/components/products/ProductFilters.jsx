// src/pages/admin/components/products/ProductFilters.jsx

import { mockCategories } from "../../_mockProducts";
import AdminIcon from "../AdminIcons";

export default function ProductFilters({ filters, onChange, onReset }) {
  const handle = key => e => onChange({ ...filters, [key]: e.target.value });

  const hasActiveFilter = filters.search || filters.categoryId || filters.status || filters.stock;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Search */}
      <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-xs focus-within:border-stone-400 transition-colors">
        <AdminIcon name="search" className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Tìm tên sản phẩm..."
          value={filters.search}
          onChange={handle("search")}
          className="bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none w-full"
        />
      </div>

      {/* Category */}
      <select
        value={filters.categoryId}
        onChange={handle("categoryId")}
        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
      >
        <option value="">Tất cả danh mục</option>
        {mockCategories.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={filters.status}
        onChange={handle("status")}
        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
      >
        <option value="">Tất cả trạng thái</option>
        <option value="active">Đang bán</option>
        <option value="inactive">Ngừng bán</option>
      </select>

      {/* Stock */}
      <select
        value={filters.stock}
        onChange={handle("stock")}
        className="bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-700 outline-none cursor-pointer hover:border-stone-400 transition-colors"
      >
        <option value="">Tất cả tồn kho</option>
        <option value="instock">Còn hàng</option>
        <option value="low">Sắp hết (≤10)</option>
        <option value="out">Hết hàng</option>
      </select>

      {/* Reset */}
      {hasActiveFilter && (
        <button onClick={onReset} className="text-xs text-stone-500 hover:text-stone-800 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
          Xoá bộ lọc ×
        </button>
      )}
    </div>
  );
}
