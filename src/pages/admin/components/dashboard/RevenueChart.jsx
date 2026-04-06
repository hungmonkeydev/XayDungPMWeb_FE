// src/pages/admin/components/dashboard/RevenueChart.jsx

import { revenueChart } from "../../_mockData";

// Map getDay() label hiển thị
const DAY_LABEL = { 1: "T2", 2: "T3", 3: "T4", 4: "T5", 5: "T6", 6: "T7", 0: "CN" };

export default function RevenueChart() {
  const max = Math.max(...revenueChart.map(d => d.value));
  const todayLabel = DAY_LABEL[new Date().getDay()];
  const total = revenueChart.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-stone-900">Doanh thu 7 ngày</h3>
          <p className="text-xs text-stone-400 mt-0.5">Đơn vị: triệu đồng</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-stone-900">{total}</p>
          <p className="text-[10px] text-emerald-500 font-medium">+12.4% tuần này</p>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-2 h-[110px]">
        {revenueChart.map(d => {
          const pct = (d.value / max) * 100;
          const isToday = d.day === todayLabel;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className="relative w-full flex items-end justify-center" style={{ height: 80 }}>
                <div
                  className={["w-full rounded-t-md transition-all duration-500", isToday ? "bg-stone-900" : "bg-stone-100 group-hover:bg-stone-200"].join(" ")}
                  style={{ height: `${pct}%`, minHeight: 6 }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {d.value}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-medium ${isToday ? "text-stone-900" : "text-stone-400"}`}>{d.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
