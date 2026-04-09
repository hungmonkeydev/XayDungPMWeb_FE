// src/pages/admin/components/dashboard/OrderStatusChart.jsx

import { orderStatusData } from "../../_mockData";

export default function OrderStatusChart() {
  const total = orderStatusData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all duration-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-900">Trạng thái đơn hàng</h3>
        <p className="text-xs text-stone-400 mt-0.5">Tháng này · {total} đơn</p>
      </div>

      <div className="flex items-center gap-5">
        {/* Legend */}
        <div className="flex-1 space-y-2.5">
          {orderStatusData.map(d => (
            <div key={d.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-xs text-stone-500 flex-1 leading-none">{d.label}</span>
              <span className="text-xs font-semibold text-stone-900 tabular-nums">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
