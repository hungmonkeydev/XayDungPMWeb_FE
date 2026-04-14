// src/pages/admin/components/dashboard/TopProducts.jsx

import { topProducts } from "../../_mockData";

export default function TopProducts() {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all duration-200">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-stone-900">Sản phẩm bán chạy</h3>
        <p className="text-xs text-stone-400 mt-0.5">Tháng này</p>
      </div>

      <div className="space-y-4">
        {topProducts.map((p, i) => {
          return (
            <div key={p.name}>
              {/* Row: rank + name + sold */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-stone-400">{i + 1}</span>
                <p className="flex-1 text-xs font-medium text-stone-900 truncate min-w-0">{p.name}</p>
                <p className="text-xs font-semibold text-stone-900 flex-shrink-0 tabular-nums">{p.sold} đã bán</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
