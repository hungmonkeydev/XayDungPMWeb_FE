// src/pages/admin/components/promotions/PromotionStatsBar.jsx

import { promotionStats } from "../../_mockPromotions";

const CARDS = [
  { label: "Tổng khuyến mãi", key: "total", color: "text-stone-900", bg: "bg-stone-50" },
  { label: "Đang chạy", key: "active", color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Sắp hết hạn", key: "expiring", color: "text-amber-700", bg: "bg-amber-50" },
  { label: "Sắp diễn ra", key: "upcoming", color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Đã kết thúc", key: "expired", color: "text-stone-500", bg: "bg-stone-100" },
  { label: "Tổng lượt dùng", key: "totalUsage", color: "text-violet-700", bg: "bg-violet-50" }
];

export default function PromotionStatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CARDS.map(c => (
        <div key={c.key} className={`${c.bg} rounded-xl px-4 py-3 flex flex-col gap-1`}>
          <p className="text-[11px] font-medium text-stone-500 leading-tight">{c.label}</p>
          <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{promotionStats[c.key]}</p>
        </div>
      ))}
    </div>
  );
}
