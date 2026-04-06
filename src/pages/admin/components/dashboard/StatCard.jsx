// src/pages/admin/components/dashboard/StatCard.jsx

import AdminIcon from "../AdminIcons";

const ICON_STYLE = {
  revenue: "bg-blue-50   text-blue-600",
  orders: "bg-violet-50 text-violet-600",
  customers: "bg-emerald-50 text-emerald-600",
  cancel: "bg-rose-50   text-rose-600"
};

export default function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 flex flex-col gap-4 hover:shadow-sm hover:border-stone-200 transition-all duration-200">
      {/* Icon + delta */}
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ICON_STYLE[icon] ?? "bg-stone-50 text-stone-600"}`}>
          <AdminIcon name={icon} className="w-4 h-4" />
        </div>
      </div>

      {/* Value + label */}
      <div>
        <p className="text-2xl font-bold text-stone-900 tracking-tight leading-none mb-1.5">{value}</p>
        <p className="text-xs text-stone-400 font-medium">{label}</p>
      </div>
    </div>
  );
}
