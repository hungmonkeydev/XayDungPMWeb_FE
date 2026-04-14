// src/pages/admin/StaffPage.jsx

import { useState, useMemo } from "react";
import { useStaff } from "../../hooks/useStaff";
import StaffStatsBar from "./components/staff/StaffStatsBar";
import StaffFilters from "./components/staff/StaffFilters";
import StaffTable from "./components/staff/StaffTable";
import StaffFormModal from "./components/staff/StaffFormModal";

const INIT_FILTERS = { search: "", type: "", status: "", loginMethod: "" };

/* ── Loading skeleton ── */
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-14 bg-stone-100 rounded-xl" />
      ))}
    </div>
  );
}

/* ── Error banner ── */
function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <span>{message}</span>
      </div>
      <button onClick={onRetry} className="flex-shrink-0 text-xs font-semibold underline underline-offset-2 hover:no-underline">
        Thử lại
      </button>
    </div>
  );
}

export default function StaffPage() {
  const { staffList, loading, error, refetch, createStaff, updateStaff, deleteStaff, toggleStatus } = useStaff();

  const [filters, setFilters] = useState(INIT_FILTERS);
  const [modal, setModal] = useState(null); // null | "create" | staff object
  const [confirm, setConfirm] = useState(null); // { type: "toggle" | "delete", staff }
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ msg: "", type: "success" });

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
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  /* ── Create / Update ── */
  const handleSave = async formData => {
    const isEdit = typeof modal === "object" && modal !== null;
    setActionLoading(true);
    try {
      if (isEdit) {
        await updateStaff(modal.id, formData);
        showToast(`Đã cập nhật thông tin "${formData.name}"`);
      } else {
        await createStaff(formData);
        showToast(`Đã tạo tài khoản "${formData.name}"`);
      }
      setModal(null);
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra, vui lòng thử lại.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  /* ── Toggle active/inactive ── */
  const handleToggleStatus = async () => {
    if (!confirm) return;
    const { staff } = confirm;
    setActionLoading(true);
    try {
      await toggleStatus(staff);
      showToast(staff.isActive ? `Đã khoá tài khoản "${staff.name}"` : `Đã mở khoá tài khoản "${staff.name}"`);
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra, vui lòng thử lại.", "error");
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  };

  /* ── Delete ── */
  const handleDelete = async () => {
    if (!confirm) return;
    const { staff } = confirm;
    setActionLoading(true);
    try {
      await deleteStaff(staff.id);
      showToast(`Đã xoá tài khoản "${staff.name}"`);
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra, vui lòng thử lại.", "error");
    } finally {
      setActionLoading(false);
      setConfirm(null);
    }
  };

  const isToggleConfirm = confirm?.type === "toggle";
  const confirmStaff = confirm?.staff;

  return (
    <div className="p-6 space-y-5 max-w-[1400px]">
      {/* Toast */}
      {toast.msg && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-2 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-lg transition-all ${
            toast.type === "error" ? "bg-rose-600" : "bg-stone-900"
          }`}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 flex-shrink-0">
            {toast.type === "error" ? <path d="M6 6l8 8M14 6l-8 8" /> : <path d="M5 10l4 4 6-7" />}
          </svg>
          {toast.msg}
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
      <StaffStatsBar staffList={staffList} />

      {/* Error */}
      {error && <ErrorBanner message={error} onRetry={refetch} />}

      {/* Filters */}
      {!loading && !error && <StaffFilters filters={filters} onChange={setFilters} onReset={() => setFilters(INIT_FILTERS)} total={filtered.length} />}

      {/* Table / Loading */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        !error && (
          <StaffTable
            staffList={filtered}
            onEdit={s => setModal(s)}
            onToggleStatus={s => setConfirm({ type: "toggle", staff: s })}
            onDelete={s => setConfirm({ type: "delete", staff: s })}
          />
        )
      )}

      {/* Form modal */}
      {modal !== null && <StaffFormModal staff={typeof modal === "object" ? modal : null} onClose={() => setModal(null)} onSave={handleSave} loading={actionLoading} />}

      {/* Confirm modal (toggle hoặc delete) */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.35)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
                !isToggleConfirm ? "bg-rose-50" : confirmStaff?.isActive ? "bg-rose-50" : "bg-emerald-50"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`w-6 h-6 ${!isToggleConfirm ? "text-rose-500" : confirmStaff?.isActive ? "text-rose-500" : "text-emerald-600"}`}
              >
                {!isToggleConfirm ? (
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                ) : confirmStaff?.isActive ? (
                  <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                ) : (
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>

            <div className="text-center">
              <h4 className="text-base font-bold text-stone-900">
                {!isToggleConfirm ? "Xoá tài khoản?" : confirmStaff?.isActive ? "Khoá tài khoản?" : "Mở khoá tài khoản?"}
              </h4>
              <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">
                {!isToggleConfirm
                  ? `Tài khoản "${confirmStaff?.name}" sẽ bị xoá vĩnh viễn và không thể khôi phục.`
                  : confirmStaff?.isActive
                    ? `"${confirmStaff?.name}" sẽ bị khoá và không thể đăng nhập cho đến khi được mở lại.`
                    : `"${confirmStaff?.name}" sẽ được kích hoạt và có thể đăng nhập hệ thống.`}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setConfirm(null)}
                disabled={actionLoading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors disabled:opacity-50"
              >
                Huỷ
              </button>
              <button
                onClick={isToggleConfirm ? handleToggleStatus : handleDelete}
                disabled={actionLoading}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${
                  !isToggleConfirm ? "bg-rose-600 hover:bg-rose-700" : confirmStaff?.isActive ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {actionLoading ? "Đang xử lý..." : !isToggleConfirm ? "Xác nhận xoá" : confirmStaff?.isActive ? "Xác nhận khoá" : "Xác nhận mở"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
