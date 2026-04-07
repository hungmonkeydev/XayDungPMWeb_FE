// src/pages/admin/components/customers/CustomerStatsBar.jsx

import { customerStats } from "../../_mockCustomers";

const CARDS = [
  { label: "Tổng khách hàng", key: "total", color: "text-stone-900", bg: "bg-stone-50" },
  { label: "Đang hoạt động", key: "active", color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Vô hiệu hoá", key: "inactive", color: "text-rose-700", bg: "bg-rose-50" },
  { label: "Đăng nhập Google", key: "google", color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Mới tháng này", key: "newThisMonth", color: "text-violet-700", bg: "bg-violet-50" }
];

export default function CustomerStatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {CARDS.map(c => (
        <div key={c.key} className={`${c.bg} rounded-xl px-4 py-3 flex flex-col gap-1`}>
          <p className="text-[11px] font-medium text-stone-500 leading-tight">{c.label}</p>
          <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{customerStats[c.key]}</p>
        </div>
      ))}
    </div>
  );
}
