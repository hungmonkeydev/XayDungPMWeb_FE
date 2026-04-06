// src/pages/admin/components/dashboard/OrderStatusChart.jsx

import { orderStatusData } from "../../_mockData";

/** Tạo SVG path hình quạt */
function slicePath(cx, cy, r, startDeg, endDeg) {
  const rad = d => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startDeg));
  const y1 = cy + r * Math.sin(rad(startDeg));
  const x2 = cx + r * Math.cos(rad(endDeg));
  const y2 = cy + r * Math.sin(rad(endDeg));
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}

export default function OrderStatusChart() {
  const total = orderStatusData.reduce((s, d) => s + d.value, 0);
  const GAP = 2; // degrees gap giữa các slice

  var cursor = -90; // bắt đầu từ 12 giờ
  const segments = orderStatusData.map(d => {
    const sweep = (d.value / total) * 360 - GAP;
    const path = slicePath(50, 50, 38, cursor, cursor + sweep);
    cursor += (d.value / total) * 360;
    return { ...d, path };
  });

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all duration-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-900">Trạng thái đơn hàng</h3>
        <p className="text-xs text-stone-400 mt-0.5">Tháng này · {total} đơn</p>
      </div>

      <div className="flex items-center gap-5">
        {/* Donut SVG */}
        <div className="relative flex-shrink-0">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="#f5f5f4" />
            {segments.map((seg, i) => (
              <path key={i} d={seg.path} fill={seg.color} className="hover:opacity-80 transition-opacity cursor-pointer" />
            ))}
            {/* Hole */}
            <circle cx="50" cy="50" r="26" fill="white" />
            <text x="50" y="47" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1c1917">
              {total}
            </text>
            <text x="50" y="57" textAnchor="middle" fontSize="6" fill="#a8a29e">
              đơn
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5">
          {orderStatusData.map(d => (
            <div key={d.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-xs text-stone-500 flex-1 leading-none">{d.label}</span>
              <span className="text-xs font-semibold text-stone-900 tabular-nums">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
