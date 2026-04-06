// src/pages/admin/components/dashboard/StatCard.jsx

import AdminIcon from "../AdminIcons";

const ICON_STYLE = {
  revenue: "bg-blue-50   text-blue-600",
  orders: "bg-violet-50 text-violet-600",
  customers: "bg-emerald-50 text-emerald-600",
  cancel: "bg-rose-50   text-rose-600"
};

export default function StatCard({ label, value, delta, icon, invertDelta = false }) {
  const isPositive = delta > 0;
  // invertDelta = true (tỷ lệ hủy)
  const isGood = invertDelta ? !isPositive : isPositive;

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-sm hover:border-stone-200 transition-all duration-200">
      {/* Icon + delta */}
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ICON_STYLE[icon] ?? "bg-stone-50 text-stone-600"}`}>
          <AdminIcon name={icon} className="w-4 h-4" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${isGood ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
          <AdminIcon name={isPositive ? "arrowUp" : "arrowDown"} className="w-3 h-3" />
          {Math.abs(delta)}%
        </div>
      </div>

      {/* Value + label */}
      <div>
        <p className="text-2xl font-bold text-stone-900 tracking-tight leading-none mb-1.5">{value}</p>
        <p className="text-xs text-stone-400 font-medium">{label}</p>
      </div>

      <p className="text-[10px] text-stone-300 border-t border-stone-50 pt-3">so với tháng trước</p>
    </div>
  );
}
