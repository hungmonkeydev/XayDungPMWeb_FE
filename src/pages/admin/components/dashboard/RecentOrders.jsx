// src/pages/admin/components/dashboard/RecentOrders.jsx

import { recentOrders } from "../../_mockData";

const STATUS_CFG = {
  completed: { label: "Hoàn tất", cls: "bg-emerald-50 text-emerald-700" },
  shipping: { label: "Đang giao", cls: "bg-blue-50   text-blue-700" },
  confirmed: { label: "Xác nhận", cls: "bg-violet-50 text-violet-700" },
  pending: { label: "Chờ xử lý", cls: "bg-amber-50  text-amber-700" },
  cancelled: { label: "Đã hủy", cls: "bg-rose-50   text-rose-700" }
};

const METHOD_CFG = {
  VNPay: "bg-blue-50 text-blue-600",
  COD: "bg-stone-100 text-stone-500"
};

export default function RecentOrders() {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Đơn hàng gần đây</h3>
          <p className="text-xs text-stone-400 mt-0.5">5 đơn hàng mới nhất</p>
        </div>
        <button className="text-xs text-stone-500 font-medium hover:text-stone-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-stone-50">Xem tất cả →</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-1">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="border-b border-stone-50">
              {["Mã đơn", "Khách hàng", "Sản phẩm", "Tổng tiền", "Thanh toán", "Trạng thái"].map(h => (
                <th key={h} className="text-left text-[10px] font-semibold text-stone-400 uppercase tracking-wider pb-3 px-1 last:text-center">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {recentOrders.map(order => {
              const status = STATUS_CFG[order.status];
              return (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors cursor-pointer">
                  <td className="py-3 px-1">
                    <span className="text-xs font-mono font-semibold text-stone-700">{order.id}</span>
                  </td>
                  <td className="py-3 px-1">
                    <span className="text-xs font-medium text-stone-900">{order.customer}</span>
                  </td>
                  <td className="py-3 px-1 hidden sm:table-cell">
                    <span className="text-xs text-stone-500 block truncate max-w-[160px]">{order.product}</span>
                  </td>
                  <td className="py-3 px-1">
                    <span className="text-xs font-semibold text-stone-900 tabular-nums">{order.total}</span>
                  </td>
                  <td className="py-3 px-1 text-center">
                    <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${METHOD_CFG[order.method]}`}>{order.method}</span>
                  </td>
                  <td className="py-3 px-1 text-center">
                    <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.cls}`}>{status.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
