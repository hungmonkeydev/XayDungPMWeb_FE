// src/pages/admin/ProductsPage.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockProducts } from "./_mockProducts";
import ProductStatsBar from "./components/products/ProductStatsBar";
import ProductFilters from "./components/products/ProductFilters";
import ProductTable from "./components/products/ProductTable";

const INIT_FILTERS = { search: "", categoryId: "", status: "", stock: "" };

export default function ProductsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INIT_FILTERS);

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return mockProducts.filter(p => {
      // search
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      // category
      if (filters.categoryId && p.categoryId !== Number(filters.categoryId)) return false;
      // status
      if (filters.status && p.status !== filters.status) return false;
      // stock
      if (filters.stock) {
        const total = p.attributes.reduce((s, a) => s + a.stock, 0);
        if (filters.stock === "out" && total !== 0) return false;
        if (filters.stock === "low" && !(total > 0 && total <= 10)) return false;
        if (filters.stock === "instock" && total <= 10) return false;
      }
      return true;
    });
  }, [filters]);

  const handleEdit = product => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const handleCreate = () => {
    navigate("/admin/products/create");
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Sản phẩm</h2>
          <p className="text-xs text-stone-400 mt-0.5">Quản lý toàn bộ sản phẩm, biến thể màu sắc và kích thước</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-stone-700 active:scale-95 transition-all duration-150 flex-shrink-0"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
            <path d="M8 2v12M2 8h12" />
          </svg>
          Thêm sản phẩm
        </button>
      </div>

      {/* ── Stats ── */}
      <ProductStatsBar />

      {/* ── Filters ── */}
      <ProductFilters filters={filters} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} />

      {/* ── Table ── */}
      <ProductTable products={filtered} onEdit={handleEdit} />
    </div>
  );
}
