// src/pages/admin/components/customers/CustomerTable.jsx

function fmtPrice(n) {
  if (n === 0) return "—";
  if (n >= 1_000_000) return `₫${(n / 1_000_000).toFixed(1)}M`;
  return "₫" + n.toLocaleString("vi-VN");
}

function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

// Lấy 2 chữ cái đầu của tên (họ + tên cuối)
function initials(name) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Màu avatar theo id
const AVATAR_COLORS = [
  "bg-blue-100   text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100  text-amber-700",
  "bg-rose-100   text-rose-700",
  "bg-teal-100   text-teal-700"
];

export default function CustomerTable({ customers, onView, onToggleStatus }) {
  if (customers.length === 0) {
    return (
      <div className="bg-white border border-stone-100 rounded-2xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-stone-400">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-600">Không tìm thấy khách hàng</p>
          <p className="text-xs text-stone-400 mt-1">Thử thay đổi bộ lọc hoặc từ khoá</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              {[
                { label: "Khách hàng", cls: "text-left" },
                { label: "Đăng nhập", cls: "text-center" },
                { label: "Ngày tham gia", cls: "text-center hidden md:table-cell" },
                { label: "Số đơn", cls: "text-center" },
                { label: "Tổng chi tiêu", cls: "text-right" },
                { label: "Đơn gần nhất", cls: "text-center hidden lg:table-cell" },
                { label: "Trạng thái", cls: "text-center" },
                { label: "", cls: "w-[100px]" }
              ].map(h => (
                <th key={h.label} className={`text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-4 py-3 ${h.cls}`}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-50">
            {customers.map(c => {
              const colorCls = AVATAR_COLORS[c.id % AVATAR_COLORS.length];

              return (
                <tr key={c.id} className="group hover:bg-stone-50/50 transition-colors">
                  {/* Customer */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorCls}`}>{initials(c.name)}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-stone-900 truncate">{c.name}</p>
                        </div>
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">{c.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Login method */}
                  <td className="px-4 py-3.5 text-center">
                    {c.loginMethod === "google" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                        <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 flex-shrink-0" fill="none">
                          <path d="M15.3 8.2c0-.6-.1-1.1-.2-1.6H8v3h4.1c-.2.9-.7 1.7-1.4 2.2v1.8h2.3c1.3-1.2 2.1-3 2.3-5.4z" fill="#4285F4" />
                          <path d="M8 16c2.2 0 4-.7 5.3-1.9l-2.3-1.8c-.7.5-1.5.8-2.4.8a4.3 4.3 0 01-4-2.9H1.6v1.9C2.9 14.3 5.3 16 8 16z" fill="#34A853" />
                          <path d="M4 10.2A4.2 4.2 0 013.8 8.8v-.6-.6a4.4 4.4 0 010-2.4V3.3H1.6A8 8 0 000 8c0 1.3.3 2.5.8 3.6L4 10.2z" fill="#FBBC04" />
                          <path d="M8 3.5c1.2 0 2.3.4 3.2 1.2L13.5 2C12 .7 10.2 0 8 0 5.3 0 2.9 1.7 1.6 4.1L4 6c.7-1.7 2.3-2.5 4-2.5z" fill="#EA4335" />
                        </svg>
                        Google
                      </span>
                    ) : (
                      <span className="inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">Email</span>
                    )}
                  </td>

                  {/* Join date */}
                  <td className="px-4 py-3.5 text-center hidden md:table-cell">
                    <span className="text-[11px] text-stone-400">{fmtDate(c.createdAt)}</span>
                  </td>

                  {/* Orders */}
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-sm font-bold text-stone-900">{c.totalOrders}</span>
                  </td>

                  {/* Spent */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="text-sm font-bold text-stone-900 tabular-nums">{fmtPrice(c.totalSpent)}</span>
                  </td>

                  {/* Last order */}
                  <td className="px-4 py-3.5 text-center hidden lg:table-cell">
                    <span className="text-[11px] text-stone-400">{fmtDate(c.lastOrderAt)}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={`inline-flex text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                        c.isActive ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {c.isActive ? "Hoạt động" : "Vô hiệu hoá"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <button
                        onClick={() => onView(c)}
                        className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                      >
                        Xem →
                      </button>
                      <button
                        onClick={() => onToggleStatus(c)}
                        className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
                          c.isActive ? "text-rose-500 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {c.isActive ? "Khoá" : "Mở"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100">
        <p className="text-xs text-stone-400">
          Hiển thị <span className="font-semibold text-stone-700">{customers.length}</span> khách hàng
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map(p => (
            <button
              key={p}
              className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === 1 ? "bg-stone-900 text-white font-semibold" : "text-stone-500 hover:bg-stone-100"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
