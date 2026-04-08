// src/pages/admin/PromotionsPage.jsx

import { useState, useMemo } from "react";
import { mockPromotions, getPromotionStatus } from "./_mockPromotions";
import PromotionStatsBar from "./components/promotions/PromotionStatsBar";
import PromotionFilters from "./components/promotions/PromotionFilters";
import PromotionCard from "./components/promotions/PromotionCard";
import PromotionFormModal from "./components/promotions/PromotionFormModal";

const INIT_FILTERS = { search: "", status: "", type: "" };

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState(mockPromotions);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [modal, setModal] = useState(null); // null | "create" | promotion object
  const [toast, setToast] = useState("");

  /* ── Filter ── */
  const filtered = useMemo(() => {
    return promotions.filter(p => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!p.code.toLowerCase().includes(q) && !p.name.toLowerCase().includes(q)) return false;
      }
      if (filters.status && getPromotionStatus(p) !== filters.status) return false;
      if (filters.type && p.type !== filters.type) return false;
      return true;
    });
  }, [promotions, filters]);

  /* ── Grouped by status for ordered display ── */
  const grouped = useMemo(() => {
    const ORDER = ["active", "expiring", "upcoming", "expired", "inactive"];
    return [...filtered].sort((a, b) => ORDER.indexOf(getPromotionStatus(a)) - ORDER.indexOf(getPromotionStatus(b)));
  }, [filtered]);

  /* ── Helpers ── */
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleToggleStatus = promo => {
    // TODO: gọi API PATCH /promotions/:id { isActive: !promo.isActive }
    setPromotions(prev => prev.map(p => (p.id === promo.id ? { ...p, isActive: !p.isActive } : p)));
    showToast(promo.isActive ? `Đã tắt khuyến mãi "${promo.code}"` : `Đã bật lại "${promo.code}"`);
  };

  const handleSave = formData => {
    if (typeof modal === "object" && modal !== null) {
      // Edit
      setPromotions(prev =>
        prev.map(p =>
          p.id === modal.id
            ? {
                ...p,
                ...formData,
                categories: formData.categoryIds.map(id => ({
                  id,
                  name: ["", "Phòng khách", "Phòng ngủ", "Phòng ăn", "Phòng làm việc", "Phòng bếp", "Ngoài trời"][id]
                }))
              }
            : p
        )
      );
      showToast(`Đã lưu thay đổi cho "${formData.code}"`);
    } else {
      // Create
      const newPromo = {
        ...formData,
        id: Date.now(),
        usageCount: 0,
        categories: formData.categoryIds.map(id => ({
          id,
          name: ["", "Phòng khách", "Phòng ngủ", "Phòng ăn", "Phòng làm việc", "Phòng bếp", "Ngoài trời"][id]
        }))
      };
      setPromotions(prev => [newPromo, ...prev]);
      showToast(`Đã tạo khuyến mãi "${formData.code}"`);
    }
    setModal(null);
  };

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg">
          <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
            <path d="M5 10l4 4 6-7" />
          </svg>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Khuyến mãi</h2>
          <p className="text-xs text-stone-400 mt-0.5">Tạo và quản lý mã giảm giá, chiến dịch theo danh mục sản phẩm</p>
        </div>
        <button
          onClick={() => setModal("create")}
          className="flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-stone-700 active:scale-95 transition-all duration-150 flex-shrink-0"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
            <path d="M8 2v12M2 8h12" />
          </svg>
          Tạo khuyến mãi
        </button>
      </div>

      {/* Stats */}
      <PromotionStatsBar />

      {/* Filters */}
      <PromotionFilters filters={filters} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} total={filtered.length} />

      {/* Card grid */}
      {grouped.length === 0 ? (
        <div className="bg-white border border-stone-100 rounded-2xl flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-stone-400">
              <path d="M7 7h.01M7 3h5l9 9-9 9-9-9z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-600">Không tìm thấy khuyến mãi</p>
          <p className="text-xs text-stone-400 mt-1">Thử thay đổi bộ lọc hoặc tạo khuyến mãi mới</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {grouped.map(promo => (
            <PromotionCard key={promo.id} promotion={promo} onEdit={p => setModal(p)} onToggleStatus={handleToggleStatus} />
          ))}
        </div>
      )}

      {/* Modal */}
      {modal !== null && <PromotionFormModal promotion={typeof modal === "object" ? modal : null} onClose={() => setModal(null)} onSave={handleSave} />}
    </div>
  );
}
