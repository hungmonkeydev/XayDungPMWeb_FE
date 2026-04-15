// src/pages/admin/components/orders/OrderStatsBar.jsx

function fmtRevenue(n) {
  if (n >= 1_000_000_000) return `₫${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `₫${(n / 1_000_000).toFixed(1)}M`;
  return `₫${(n || 0).toLocaleString("vi-VN")}`;
}

const CARDS = [
  { label: "Doanh thu (hoàn tất)", key: "revenue", fmt: fmtRevenue, color: "text-stone-900", bg: "bg-stone-50" },
  { label: "Chờ xử lý", key: "pending", fmt: v => v, color: "text-amber-700", bg: "bg-amber-50" },
  { label: "Xác nhận", key: "confirmed", fmt: v => v, color: "text-violet-700", bg: "bg-violet-50" },
  { label: "Đang giao", key: "shipping", fmt: v => v, color: "text-blue-700", bg: "bg-blue-50" },
  { label: "Hoàn tất", key: "completed", fmt: v => v, color: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Đã huỷ", key: "cancelled", fmt: v => v, color: "text-rose-700", bg: "bg-rose-50" }
];

export default function OrderStatsBar({ orders = [] }) {
  /* ───────── CALCULATE STATS ───────── */
  const stats = orders.reduce(
    (acc, o) => {
      const status = o?.status;

      // count status
      if (status && acc[status] !== undefined) {
        acc[status]++;
      }

      // revenue chỉ tính completed
      if (status === "completed") {
        acc.revenue += o?.totalPrice || 0;
      }

      return acc;
    },
    {
      revenue: 0,
      pending: 0,
      confirmed: 0,
      shipping: 0,
      completed: 0,
      cancelled: 0
    }
  );

  /* ───────── UI ───────── */
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {CARDS.map(c => (
        <div key={c.key} className={`${c.bg} rounded-xl px-4 py-3 flex flex-col gap-1`}>
          <p className="text-[11px] font-medium text-stone-500 leading-tight">{c.label}</p>
          <p className={`text-2xl font-bold tracking-tight ${c.color}`}>{c.fmt(stats[c.key] || 0)}</p>
        </div>
      ))}
    </div>
  );
}
