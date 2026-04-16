// src/pages/admin/ProductsPage.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProductAdmin";
import ProductStatsBar from "./components/products/ProductStatsBar";
import ProductFilters from "./components/products/ProductFilters";
import ProductTable from "./components/products/ProductTable";
import { useSelector } from "react-redux";

const INIT_FILTERS = { search: "", categoryId: "", status: "", stock: "" };

// Map API shape → shape yang diharapkan ProductTable
function normalizeProduct(p) {
  return {
    id: p.id,
    name: p.name,
    categoryId: p.categoryId,
    categoryName: p.Category?.name ?? "",
    status: p.status ?? "active", // API chưa trả status → mặc định active
    createdAt: new Date(p.createdAt).toLocaleDateString("vi-VN"),
    image: p.ProductImages?.[0]?.imageUrl ?? null,
    attributes: (p.ProductAttributes ?? []).map(a => ({
      id: a.id,
      name: a.name,
      price: parseFloat(a.price),
      stock: a.stock,
      colorName: a.Color?.name ?? "",
      colorHex: a.Color?.hexCode ?? "#ccc",
      dimensionsName: a.Dimension?.name ?? ""
    }))
  };
}

export default function ProductsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(INIT_FILTERS);
  const { data, pagination, page, setPage, loading, error, deleteProduct } = useProducts();

  // Normalize toàn bộ data từ API
  const products = useMemo(() => data.map(normalizeProduct), [data]);

  // Categories động từ data (dùng cho dropdown filter)
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach(p => {
      if (p.categoryId) map.set(p.categoryId, p.categoryName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [products]);

  // Client-side filter
  const filtered = useMemo(() => {
    return products.filter(p => {
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.categoryId && p.categoryId !== Number(filters.categoryId)) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.stock) {
        const total = p.attributes.reduce((s, a) => s + a.stock, 0);
        if (filters.stock === "out" && total !== 0) return false;
        if (filters.stock === "low" && !(total > 0 && total <= 10)) return false;
        if (filters.stock === "instock" && total <= 10) return false;
      }
      return true;
    });
  }, [products, filters]);

  const handleEdit = product => navigate(`/admin/products/edit/${product.id}`);
  const handleCreate = () => navigate("/admin/products/create");

  const token = useSelector(state => state.auth.token);
  const handleDelete = async product => {
    if (!window.confirm(`Xoá sản phẩm "${product.name}"?`)) return;
    try {
      await deleteProduct(product.id, token);
    } catch {
      alert("Xoá thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Header */}
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

      {/* Stats tính từ data hiện tại */}
      <ProductStatsBar products={products} />

      {/* Filters — categories từ API */}
      <ProductFilters filters={filters} categories={categories} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} />

      {/* Error */}
      {error && <div className="bg-rose-50 text-rose-700 text-sm px-4 py-3 rounded-xl border border-rose-100">Không thể tải dữ liệu: {error}</div>}

      {/* Table */}
      <ProductTable products={filtered} loading={loading} pagination={pagination} page={page} onPageChange={setPage} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
