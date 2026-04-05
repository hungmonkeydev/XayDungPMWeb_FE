// src/pages/admin/components/dashboard/TopProducts.jsx

import { topProducts } from "../../_mockData";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function TopProducts() {
  const maxSold = Math.max(...topProducts.map(p => p.sold));

  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all duration-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-900">Sản phẩm bán chạy</h3>
        <p className="text-xs text-stone-400 mt-0.5">Tháng này</p>
      </div>

      <div className="space-y-4">
        {topProducts.map((p, i) => {
          const pct = Math.round((p.sold / maxSold) * 100);
          return (
            <div key={p.name}>
              {/* Row: rank + name + sold */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm w-5 flex-shrink-0 leading-none">{MEDALS[i] ?? <span className="text-xs text-stone-400">{i + 1}</span>}</span>
                <p className="flex-1 text-xs font-medium text-stone-900 truncate min-w-0">{p.name}</p>
                <p className="text-xs font-semibold text-stone-900 flex-shrink-0 tabular-nums">{p.sold} đã bán</p>
              </div>
              {/* Progress bar + revenue */}
              <div className="flex items-center gap-2 pl-7">
                <div className="flex-1 h-1 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-800 rounded-full transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] text-stone-400 w-16 text-right flex-shrink-0 tabular-nums">{p.revenue}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
