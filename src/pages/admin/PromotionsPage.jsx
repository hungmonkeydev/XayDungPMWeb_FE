// src/pages/admin/PromotionsPage.jsx

import { useState, useMemo } from "react";
import usePromotions from "../../hooks/usePromotions";
import PromotionStatsBar from "./components/promotions/PromotionStatsBar";
import PromotionFilters from "./components/promotions/PromotionFilters";
import PromotionCard from "./components/promotions/PromotionCard";
import PromotionFormModal from "./components/promotions/PromotionFormModal";

/* ── Helpers ── */

function getPromotionStatus(promotion) {
  const now = new Date();
  const start = new Date(promotion.startDay);
  const end = new Date(promotion.endDay);
  end.setHours(23, 59, 59);

  if (!promotion.isActive) return "inactive";
  if (now < start) return "upcoming";

  const diffDays = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  if (now <= end && diffDays <= 3) return "expiring";
  if (now <= end) return "active";
  return "expired";
}

const PROMO_STATUS_CFG = {
  active: { label: "Đang chạy", cls: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  expiring: { label: "Sắp hết hạn", cls: "bg-amber-50   text-amber-700", dot: "bg-amber-400" },
  upcoming: { label: "Sắp diễn ra", cls: "bg-blue-50    text-blue-700", dot: "bg-blue-400" },
  expired: { label: "Hết hạn", cls: "bg-stone-100  text-stone-500", dot: "bg-stone-400" },
  inactive: { label: "Tắt", cls: "bg-stone-100  text-stone-400", dot: "bg-stone-300" }
};

const INIT_FILTERS = { search: "", status: "", type: "" };

export default function PromotionsPage() {
  const { promotions, loading, error, refetch, savePromotion, toggleStatus } = usePromotions();

  const [filters, setFilters] = useState(INIT_FILTERS);
  const [modal, setModal] = useState(null); // null | "create" | promotion object
  const [toast, setToast] = useState({ msg: "", type: "success" });

  /* ── Toast ── */
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

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

  /* ── Sort by status ── */
  const grouped = useMemo(() => {
    const ORDER = ["active", "expiring", "upcoming", "expired", "inactive"];
    return [...filtered].sort((a, b) => ORDER.indexOf(getPromotionStatus(a)) - ORDER.indexOf(getPromotionStatus(b)));
  }, [filtered]);

  /* ── Toggle activate / deactivate ── */
  const handleToggleStatus = async promo => {
    try {
      await toggleStatus(promo);
      showToast(promo.isActive ? `Đã tắt khuyến mãi "${promo.code}"` : `Đã bật lại "${promo.code}"`);
    } catch {
      showToast(`Không thể thay đổi trạng thái "${promo.code}". Vui lòng thử lại.`, "error");
    }
  };

  /* ── Create / Update ── */
  const handleSave = async formData => {
    const isEditing = typeof modal === "object" && modal !== null;
    try {
      await savePromotion(formData, isEditing ? modal : null);
      showToast(isEditing ? `Đã lưu thay đổi cho "${formData.code}"` : `Đã tạo khuyến mãi "${formData.code}"`);
      setModal(null);
    } catch (err) {
      const msg = err?.response?.data?.message ?? "Lưu thất bại. Vui lòng thử lại.";
      showToast(msg, "error");
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3 text-stone-400">
          <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          <span className="text-sm font-medium">Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-rose-500">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <p className="text-sm font-medium text-stone-700">{error}</p>
          <button onClick={refetch} className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline underline-offset-2">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Toast */}
      {toast.msg && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg transition-all ${
            toast.type === "error" ? "bg-rose-600" : "bg-stone-900"
          }`}
        >
          {toast.type === "error" ? (
            <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
              <circle cx="10" cy="10" r="8" />
              <path d="M10 6v4M10 14h.01" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
              <path d="M5 10l4 4 6-7" />
            </svg>
          )}
          {toast.msg}
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
      <PromotionStatsBar promotions={promotions} />

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
