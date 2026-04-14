// src/hooks/useStaff.js
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

const BASE = "https://xaydungwebnoithat-backend.onrender.com/api/admin/staff";

export function useStaff() {
  const token = useSelector(state => state.auth.token);

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ── Helper: gọi fetch kèm auth header ── */
  const authFetch = useCallback(
    async (url, options = {}) => {
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers
        }
      });
      if (!res.ok) {
        const msg = res.status === 401 ? "Phiên đăng nhập hết hạn." : `Lỗi ${res.status}: ${res.statusText || "Không thể thực hiện thao tác."}`;
        throw new Error(msg);
      }
      // Một số endpoint (DELETE, activate…) có thể trả về 204 No Content
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    },
    [token]
  );

  /* ── GET /admin/staff ── */
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authFetch(BASE);
      setStaffList(Array.isArray(data) ? data : (data?.data ?? []));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (token) fetchStaff();
  }, [fetchStaff, token]);

  /* ── POST /admin/staff ── */
  const createStaff = useCallback(
    async formData => {
      const created = await authFetch(BASE, {
        method: "POST",
        body: JSON.stringify(formData)
      });
      const newStaff = created ?? {
        ...formData,
        id: Date.now(),
        loginMethod: "email",
        createdAt: new Date().toISOString(),
        lastLoginAt: null
      };
      setStaffList(prev => [...prev, newStaff]);
      return newStaff;
    },
    [authFetch]
  );

  /* ── PUT /admin/staff/:id ── */
  const updateStaff = useCallback(
    async (id, formData) => {
      const updated = await authFetch(`${BASE}/${id}`, {
        method: "PUT",
        body: JSON.stringify(formData)
      });
      setStaffList(prev => prev.map(s => (s.id === id ? { ...s, ...formData, ...(updated ?? {}) } : s)));
      return updated;
    },
    [authFetch]
  );

  /* ── DELETE /admin/staff/:id ── */
  const deleteStaff = useCallback(
    async id => {
      await authFetch(`${BASE}/${id}`, { method: "DELETE" });
      setStaffList(prev => prev.filter(s => s.id !== id));
    },
    [authFetch]
  );

  /* ── PUT /admin/staff/:id/activate ── */
  const activateStaff = useCallback(
    async id => {
      await authFetch(`${BASE}/${id}/activate`, { method: "PUT" });
      setStaffList(prev => prev.map(s => (s.id === id ? { ...s, isActive: true } : s)));
    },
    [authFetch]
  );

  /* ── PUT /admin/staff/:id/deactivate ── */
  const deactivateStaff = useCallback(
    async id => {
      await authFetch(`${BASE}/${id}/deactivate`, { method: "PUT" });
      setStaffList(prev => prev.map(s => (s.id === id ? { ...s, isActive: false } : s)));
    },
    [authFetch]
  );

  /* ── Toggle tiện lợi dùng trong StaffPage ── */
  const toggleStatus = useCallback(
    async staff => {
      if (staff.isActive) {
        await deactivateStaff(staff.id);
      } else {
        await activateStaff(staff.id);
      }
    },
    [activateStaff, deactivateStaff]
  );

  return {
    staffList,
    loading,
    error,
    refetch: fetchStaff,
    createStaff,
    updateStaff,
    deleteStaff,
    toggleStatus
  };
}
