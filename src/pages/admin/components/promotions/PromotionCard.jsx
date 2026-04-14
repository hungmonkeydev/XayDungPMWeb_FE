// src/pages/admin/components/promotions/PromotionCard.jsx

import useCategories from "../../../../hooks/useCategories";

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function daysLeft(endDay) {
  const diff = Math.ceil((new Date(endDay) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return null;
  if (diff === 0) return "Hết hạn hôm nay";
  return `Còn ${diff} ngày`;
}

function daysUntil(startDay) {
  const diff = Math.ceil((new Date(startDay) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return null;
  return `Bắt đầu sau ${diff} ngày`;
}

function getPromotionStatus(promotion) {
  const now = new Date();
  const start = new Date(promotion.startDay);
  const end = new Date(promotion.endDay);
  end.setHours(23, 59, 59);

  if (!promotion.isActive) return "inactive";
  if (now < start) return "upcoming";

  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  if (now <= end && diffDays <= 3) return "expiring";
  if (now <= end) return "active";
  return "expired";
}

const PROMO_STATUS_CFG = {
  active: { label: "Đang chạy", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  expiring: { label: "Sắp hết hạn", cls: "bg-amber-50 text-amber-700", dot: "bg-amber-400" },
  upcoming: { label: "Sắp diễn ra", cls: "bg-blue-50 text-blue-700", dot: "bg-blue-400" },
  expired: { label: "Hết hạn", cls: "bg-stone-100 text-stone-500", dot: "bg-stone-400" },
  inactive: { label: "Tắt", cls: "bg-stone-100 text-stone-400", dot: "bg-stone-300" }
};

const ALL_CAT_IDS = [1, 2, 3, 4, 5, 6];

export default function PromotionCard({ promotion, onEdit, onToggleStatus }) {
  const { categories } = useCategories();
  const status = getPromotionStatus(promotion);
  const scfg = PROMO_STATUS_CFG[status];
  const categoryList = promotion.categoryIds?.map(id => categories.find(c => c.id === id)).filter(Boolean) || [];
  const timeNote = status === "upcoming" ? daysUntil(promotion.startDay) : daysLeft(promotion.endDay);

  return (
    <div
      className={[
        "bg-white border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:shadow-sm group",
        status === "expired" || status === "inactive" ? "border-stone-100 opacity-70 hover:opacity-100" : "border-stone-100 hover:border-stone-200"
      ].join(" ")}
    >
      {/* ── Top row: code + status ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Code badge */}
          <span className="font-mono text-xs font-bold bg-stone-900 text-white px-2.5 py-1 rounded-lg tracking-wide">{promotion.code}</span>
          {/* Type badge */}
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
              promotion.type === "percentage" ? "bg-violet-50 text-violet-700 border-violet-200" : "bg-blue-50   text-blue-700   border-blue-200"
            }`}
          >
            {promotion.type === "percentage" ? "%" : "₫ cố định"}
          </span>
        </div>

        {/* Status */}
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${scfg.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${scfg.dot}`} />
          {scfg.label}
        </span>
      </div>

      {/* ── Name + description ── */}
      <div>
        <p className="text-sm font-bold text-stone-900 leading-tight">{promotion.name}</p>
        <p className="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">{promotion.description}</p>
      </div>

      {/* ── Value highlight ── */}
      <div className="flex items-center gap-3">
        <div className={`flex-1 rounded-xl px-4 py-3 text-center ${promotion.type === "percentage" ? "bg-violet-50" : "bg-blue-50"}`}>
          <p className={`text-2xl font-black tracking-tight leading-none ${promotion.type === "percentage" ? "text-violet-700" : "text-blue-700"}`}>
            {promotion.type === "percentage" ? `-${promotion.value}%` : `-₫${(promotion.value / 1000).toFixed(0)}K`}
          </p>
          <p className="text-[10px] font-medium text-stone-400 mt-1">{promotion.type === "percentage" ? "giảm phần trăm" : "giảm cố định"}</p>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="flex flex-wrap gap-1.5">
        {categoryList.length === 0 ? (
          <span className="text-[10px] text-stone-400">Tất cả sản phẩm</span>
        ) : (
          categoryList.map(cat => (
            <span key={cat.id} className="text-[10px] bg-stone-100 px-2 py-0.5 rounded-full">
              {cat.name}
            </span>
          ))
        )}
      </div>

      {/* ── Date range ── */}
      <div className="flex items-center justify-between text-[11px] text-stone-400 bg-stone-50 rounded-xl px-3 py-2">
        <span>
          {fmtDate(promotion.startDay)} → {fmtDate(promotion.endDay)}
        </span>
        {timeNote && (
          <span className={`font-semibold ${status === "expiring" ? "text-amber-600" : status === "upcoming" ? "text-blue-600" : "text-stone-500"}`}>{timeNote}</span>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-2 pt-1 border-t border-stone-50">
        <button
          onClick={() => onEdit(promotion)}
          className="flex-1 text-xs font-semibold text-stone-600 hover:text-stone-900 py-2 rounded-lg hover:bg-stone-50 transition-colors"
        >
          Chỉnh sửa
        </button>
        <div className="w-px h-4 bg-stone-100" />
        <button
          onClick={() => onToggleStatus(promotion)}
          className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-colors ${
            promotion.isActive ? "text-rose-500 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"
          }`}
        >
          {promotion.isActive ? "Tắt" : "Bật lại"}
        </button>
      </div>
    </div>
  );
}
