// src/pages/admin/StaffPage.jsx

import { useState, useMemo } from "react";
import { mockStaff } from "./_mockStaff";
import StaffStatsBar from "./components/staff/StaffStatsBar";
import StaffFilters from "./components/staff/StaffFilters";
import StaffTable from "./components/staff/StaffTable";
import StaffFormModal from "./components/staff/StaffFormModal";

const INIT_FILTERS = { search: "", type: "", status: "", loginMethod: "" };

export default function StaffPage() {
  const [staffList, setStaffList] = useState(mockStaff);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [modal, setModal] = useState(null); // null | "create" | staff object
  const [confirm, setConfirm] = useState(null); // staff to toggle status
  const [toast, setToast] = useState("");

  /* ── Filter ── */
  const filtered = useMemo(() => {
    return staffList.filter(s => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q)) return false;
      }
      if (filters.type && s.type !== filters.type) return false;
      if (filters.loginMethod && s.loginMethod !== filters.loginMethod) return false;
      if (filters.status) {
        const active = filters.status === "active";
        if (s.isActive !== active) return false;
      }
      return true;
    });
  }, [staffList, filters]);

  /* ── Helpers ── */
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSave = formData => {
    if (typeof modal === "object" && modal !== null) {
      // Edit
      setStaffList(prev => prev.map(s => (s.id === modal.id ? { ...s, ...formData } : s)));
      showToast(`Đã cập nhật thông tin "${formData.name}"`);
    } else {
      // Create
      setStaffList(prev => [...prev, { ...formData, id: Date.now(), loginMethod: "email", createdAt: new Date().toISOString(), lastLoginAt: null }]);
      showToast(`Đã tạo tài khoản "${formData.name}"`);
    }
    setModal(null);
  };

  const handleToggleStatus = () => {
    if (!confirm) return;
    // TODO: gọi API PATCH /staff/:id { isActive: !confirm.isActive }
    setStaffList(prev => prev.map(s => (s.id === confirm.id ? { ...s, isActive: !s.isActive } : s)));
    showToast(confirm.isActive ? `Đã khoá tài khoản "${confirm.name}"` : `Đã mở khoá tài khoản "${confirm.name}"`);
    setConfirm(null);
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
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">Nhân viên</h2>
          <p className="text-xs text-stone-400 mt-0.5">Quản lý tài khoản và phân quyền Admin / Staff</p>
        </div>
        <button
          onClick={() => setModal("create")}
          className="flex items-center gap-2 bg-stone-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-stone-700 active:scale-95 transition-all duration-150 flex-shrink-0"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
            <path d="M8 2v12M2 8h12" />
          </svg>
          Thêm nhân viên
        </button>
      </div>

      {/* Stats */}
      <StaffStatsBar />

      {/* Filters */}
      <StaffFilters filters={filters} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} total={filtered.length} />

      {/* Table */}
      <StaffTable staffList={filtered} onEdit={s => setModal(s)} onToggleStatus={s => setConfirm(s)} />

      {/* Form modal */}
      {modal !== null && <StaffFormModal staff={typeof modal === "object" ? modal : null} onClose={() => setModal(null)} onSave={handleSave} />}

      {/* Confirm toggle modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.35)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${confirm.isActive ? "bg-rose-50" : "bg-emerald-50"}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-6 h-6 ${confirm.isActive ? "text-rose-500" : "text-emerald-600"}`}
              >
                {confirm.isActive ? (
                  <>
                    <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636M18.364 18.364A9 9 0 015.636 5.636" />
                  </>
                ) : (
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>
            <div className="text-center">
              <h4 className="text-base font-bold text-stone-900">{confirm.isActive ? "Khoá tài khoản?" : "Mở khoá tài khoản?"}</h4>
              <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">
                {confirm.isActive
                  ? `"${confirm.name}" sẽ bị khoá và không thể đăng nhập cho đến khi được mở lại.`
                  : `"${confirm.name}" sẽ được kích hoạt và có thể đăng nhập hệ thống.`}
              </p>
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
              >
                Huỷ
              </button>
              <button
                onClick={handleToggleStatus}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 ${
                  confirm.isActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {confirm.isActive ? "Xác nhận khoá" : "Xác nhận mở"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
