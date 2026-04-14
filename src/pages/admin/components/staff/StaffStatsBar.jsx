// src/pages/admin/components/staff/StaffStatsBar.jsx

const CARDS = [
  { label: "Tổng nhân viên", key: "total", color: "text-stone-900", bg: "bg-stone-50" },
  { label: "Admin", key: "admin", color: "text-rose-700", bg: "bg-rose-50" },
  { label: "Staff", key: "staff", color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Đang hoạt động", key: "active", color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Vô hiệu hoá", key: "inactive", color: "text-stone-500", bg: "bg-stone-100" },
  { label: "Đăng nhập Google", key: "google", color: "text-violet-700", bg: "bg-violet-50" }
];

export default function StaffStatsBar({ staffList = [] }) {
  const stats = {
    total: staffList.length,
    admin: staffList.filter(s => s.type === "Admin").length,
    staff: staffList.filter(s => s.type === "Staff").length,
    active: staffList.filter(s => s.isActive).length,
    inactive: staffList.filter(s => !s.isActive).length,
    google: staffList.filter(s => s.loginMethod === "google").length
  };

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
