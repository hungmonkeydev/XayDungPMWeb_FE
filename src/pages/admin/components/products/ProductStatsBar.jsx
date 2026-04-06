// src/pages/admin/components/products/ProductStatsBar.jsx

import { productStats } from "../../_mockProducts";

const cards = [
  { label: "Tổng sản phẩm", key: "total", color: "text-stone-900", bg: "bg-stone-50" },
  { label: "Đang bán", key: "active", color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Ngừng bán", key: "inactive", color: "text-stone-500", bg: "bg-stone-100" },
  { label: "Hết hàng", key: "outOfStock", color: "text-rose-700", bg: "bg-rose-50" },
  { label: "Sắp hết (≤10)", key: "lowStock", color: "text-amber-700", bg: "bg-amber-50" }
];

export default function ProductStatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map(c => (
        <div key={c.key} className={`${c.bg} rounded-xl px-4 py-3 flex flex-col gap-1`}>
          <p className="text-[11px] font-medium text-stone-500">{c.label}</p>
          <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{productStats[c.key]}</p>
        </div>
      ))}
    </div>
  );
}
