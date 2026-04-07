// src/pages/admin/components/orders/OrderTable.jsx

import { STATUS_CFG } from "../../_mockOrders";

function fmtPrice(n) {
  return "₫" + n.toLocaleString("vi-VN");
}

function fmtDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function OrderTable({ orders, onView }) {
  if (orders.length === 0) {
    return (
      <div className="bg-white border border-stone-100 rounded-2xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-stone-400">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-600">Không tìm thấy đơn hàng</p>
          <p className="text-xs text-stone-400 mt-1">Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          {/* Head */}
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              {[
                { label: "Mã đơn", cls: "text-left  w-[110px]" },
                { label: "Khách hàng", cls: "text-left" },
                { label: "Sản phẩm", cls: "text-left  hidden lg:table-cell" },
                { label: "Tổng tiền", cls: "text-right" },
                { label: "Thanh toán", cls: "text-center" },
                { label: "Thời gian", cls: "text-center hidden md:table-cell" },
                { label: "Trạng thái", cls: "text-center" },
                { label: "", cls: "w-[80px]" }
              ].map(h => (
                <th key={h.label} className={`text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-4 py-3 ${h.cls}`}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-stone-50">
            {orders.map(order => {
              const scfg = STATUS_CFG[order.status];
              return (
                <tr key={order.id} className="group hover:bg-stone-50/50 transition-colors">
                  {/* Code */}
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-mono font-bold text-stone-800">{order.code}</span>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-semibold text-stone-900 leading-tight">{order.customerName}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{order.customerPhone}</p>
                  </td>

                  {/* Products summary */}
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <p className="text-xs text-stone-600 truncate max-w-[200px]">{order.details[0]?.productName}</p>
                    {order.details.length > 1 && <p className="text-[10px] text-stone-400 mt-0.5">+{order.details.length - 1} sản phẩm khác</p>}
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3.5 text-right">
                    <p className="text-sm font-bold text-stone-900 tabular-nums">{fmtPrice(order.totalPrice)}</p>
                    {order.discountAmount > 0 && <p className="text-[10px] text-emerald-600 mt-0.5">-{fmtPrice(order.discountAmount)}</p>}
                  </td>

                  {/* Method */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={[
                        "inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        order.method === "VNPay" ? "bg-blue-50 text-blue-600" : "bg-stone-100 text-stone-500"
                      ].join(" ")}
                    >
                      {order.method}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3.5 text-center hidden md:table-cell">
                    <span className="text-[11px] text-stone-400">{fmtDate(order.createdAt)}</span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 text-center">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${scfg.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${scfg.dot}`} />
                      {scfg.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => onView(order)}
                      className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-100 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Chi tiết →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100">
        <p className="text-xs text-stone-400">
          Hiển thị <span className="font-semibold text-stone-700">{orders.length}</span> đơn hàng
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
