// src/pages/admin/components/products/ProductTable.jsx
import { useState } from "react";

function stockBadge(total) {
  if (total === 0) return { label: "Hết hàng", cls: "bg-rose-50 text-rose-700" };
  if (total <= 10) return { label: "Sắp hết", cls: "bg-amber-50 text-amber-700" };
  return { label: "Còn hàng", cls: "bg-emerald-50 text-emerald-700" };
}

function fmtPrice(n) {
  return "₫" + n.toLocaleString("vi-VN");
}

function AttributeRows({ attributes }) {
  return (
    <tr>
      <td colSpan={8} className="p-0">
        <div className="bg-stone-50/80 border-t border-stone-100 px-4 py-3">
          <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Biến thể sản phẩm</p>
          <table className="w-full">
            <thead>
              <tr>
                {["Tên biến thể", "Màu sắc", "Kích thước", "Giá bán", "Tồn kho"].map(h => (
                  <th key={h} className="text-left text-[10px] text-stone-400 font-medium pb-1.5 pr-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {attributes.map(attr => {
                const sb = stockBadge(attr.stock);
                return (
                  <tr key={attr.id} className="hover:bg-stone-100/50 transition-colors">
                    <td className="py-2 pr-4 text-xs font-medium text-stone-800">{attr.name}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border border-stone-200 flex-shrink-0" style={{ background: attr.colorHex }} />
                        <span className="text-xs text-stone-600">{attr.colorName}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-xs text-stone-600">{attr.dimensionsName}</td>
                    <td className="py-2 pr-4 text-xs font-semibold text-stone-900 tabular-nums">{fmtPrice(attr.price)}</td>
                    <td className="py-2">
                      <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${sb.cls}`}>
                        {attr.stock > 0 ? `${attr.stock} cái` : sb.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  );
}

/* ── Pagination ── */
function Pagination({ pagination, page, onPageChange }) {
  const { total, totalPages } = pagination;
  const from = (page - 1) * pagination.limit + 1;
  const to = Math.min(page * pagination.limit, total);

  // Hiển thị tối đa 5 trang
  const pages = [];
  const delta = 2;
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-stone-100">
      <p className="text-xs text-stone-400">
        Hiển thị{" "}
        <span className="font-semibold text-stone-700">
          {from}–{to}
        </span>{" "}
        trong <span className="font-semibold text-stone-700">{total}</span> sản phẩm
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="w-7 h-7 text-xs rounded-lg text-stone-500 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          ‹
        </button>
        {pages[0] > 1 && (
          <>
            <button onClick={() => onPageChange(1)} className="w-7 h-7 text-xs rounded-lg text-stone-500 hover:bg-stone-100">
              1
            </button>
            {pages[0] > 2 && <span className="text-xs text-stone-400 px-1">…</span>}
          </>
        )}
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-7 h-7 text-xs rounded-lg transition-colors ${p === page ? "bg-stone-900 text-white font-semibold" : "text-stone-500 hover:bg-stone-100"}`}
          >
            {p}
          </button>
        ))}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && <span className="text-xs text-stone-400 px-1">…</span>}
            <button onClick={() => onPageChange(totalPages)} className="w-7 h-7 text-xs rounded-lg text-stone-500 hover:bg-stone-100">
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="w-7 h-7 text-xs rounded-lg text-stone-500 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ── Main table ── */
export default function ProductTable({ products, loading, pagination, page, onPageChange, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(null);
  const toggleExpand = id => setExpanded(prev => (prev === id ? null : id));

  if (loading) {
    return (
      <div className="bg-white border border-stone-100 rounded-2xl">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin mb-3" />
          <p className="text-sm text-stone-400">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-stone-100 rounded-2xl">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-stone-400">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-600">Không tìm thấy sản phẩm</p>
          <p className="text-xs text-stone-400 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr>
              <th className="w-8 px-4 py-3" />
              <th className="text-left text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-3 py-3">Sản phẩm</th>
              <th className="text-left text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-3 py-3">Danh mục</th>
              <th className="text-left text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-3 py-3">Biến thể</th>
              <th className="text-right text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-3 py-3">Giá từ</th>
              <th className="text-center text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-3 py-3">Tồn kho</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {products.map(product => {
              const isExpanded = expanded === product.id;
              const totalStock = product.attributes.reduce((s, a) => s + a.stock, 0);
              const minPrice = Math.min(...product.attributes.map(a => a.price));
              const sb = stockBadge(totalStock);

              return (
                <>
                  <tr key={product.id} className={`group transition-colors ${isExpanded ? "bg-stone-50/60" : "hover:bg-stone-50/40"}`}>
                    {/* Expand */}
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="w-5 h-5 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        >
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      </button>
                    </td>

                    {/* Name + image */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-100 rounded-lg flex-shrink-0 overflow-hidden">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center text-lg">🪑</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-stone-900 truncate max-w-[200px]">{product.name}</p>
                          <p className="text-[10px] text-stone-400 mt-0.5">
                            #{product.id} · {product.createdAt}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-3 py-3.5">
                      <span className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full font-medium">{product.categoryName}</span>
                    </td>

                    {/* Variant count */}
                    <td className="px-3 py-3.5">
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors group/btn"
                      >
                        <span className="font-semibold text-stone-900">{product.attributes.length}</span>
                        <span>biến thể</span>
                      </button>
                    </td>

                    {/* Price */}
                    <td className="px-3 py-3.5 text-right">
                      <span className="text-sm font-semibold text-stone-900 tabular-nums">{fmtPrice(minPrice)}</span>
                    </td>

                    {/* Stock */}
                    <td className="px-3 py-3.5 text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${sb.cls}`}>{sb.label}</span>
                        {totalStock > 0 && <span className="text-[10px] text-stone-400">{totalStock} cái</span>}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(product)}
                          className="text-[11px] font-medium text-stone-600 hover:text-stone-900 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => onDelete(product)}
                          className="text-[11px] font-medium text-rose-500 hover:text-rose-700 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          Xoá
                        </button>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && <AttributeRows key={`attr-${product.id}`} attributes={product.attributes} />}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={onPageChange} />
    </div>
  );
}
