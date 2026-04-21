// src/pages/admin/components/promotions/PromotionStatsBar.jsx
const CARDS = [
  { label: "Tổng khuyến mãi", key: "total", color: "text-stone-900", bg: "bg-stone-50" },
  { label: "Đang chạy", key: "active", color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Sắp hết hạn", key: "expiring", color: "text-amber-700", bg: "bg-amber-50" },
  { label: "Sắp diễn ra", key: "upcoming", color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Đã kết thúc", key: "expired", color: "text-stone-500", bg: "bg-stone-100" },
  { label: "Đang tắt", key: "inactive", color: "text-violet-700", bg: "bg-violet-50" }
];

function getPromotionStatus(p) {
  const now = new Date();
  const start = new Date(p.startDay);
  const end = new Date(p.endDay);
  end.setHours(23, 59, 59);

  if (!p.isActive) return "inactive";
  if (now < start) return "upcoming";

  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  if (now <= end && diffDays <= 3) return "expiring";
  if (now <= end) return "active";
  return "expired";
}

export default function PromotionStatsBar({ promotions = [] }) {
  const stats = {
    total: promotions.length,
    active: 0,
    expiring: 0,
    upcoming: 0,
    expired: 0,
    inactive: 0
  };

  promotions.forEach(p => {
    const status = getPromotionStatus(p);

    if (stats[status] !== undefined) {
      stats[status]++;
    }

    // nếu backend có usageCount thì dùng
    stats.totalUsage += p.usageCount || 0;
  });
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CARDS.map(c => (
        <div key={c.key} className={`${c.bg} rounded-xl px-4 py-3 flex flex-col gap-1`}>
          <p className="text-[11px] font-medium text-stone-500 leading-tight">{c.label}</p>
          <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{stats[c.key]}</p>
        </div>
      ))}
    </div>
  );
}
