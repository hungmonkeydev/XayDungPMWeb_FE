// src/hooks/usePromotions.js

import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api/admin/promotions";

export default function usePromotions() {
  const token = useSelector(state => state.auth.token);

  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ───────────── CONFIG ───────────── */
  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  /* ───────────── FETCH ───────────── */
  const refetch = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/all`, getConfig());

      const raw = res.data;

      const data = raw?.data?.result || raw?.data || raw?.result || (Array.isArray(raw) ? raw : []);

      setPromotions(data);

      setPromotions(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* ───────────── AUTO LOAD ───────────── */
  useEffect(() => {
    refetch();
  }, [refetch]);

  /* ───────────── SAVE (CREATE + UPDATE) ───────────── */
  const savePromotion = async (formData, editingPromo = null) => {
    if (editingPromo) {
      // UPDATE
      await axios.put(`${BASE_URL}/${editingPromo.id}`, formData, getConfig());
    } else {
      // CREATE
      await axios.post(BASE_URL, formData, getConfig());
    }

    await refetch();
  };

  /* ───────────── TOGGLE STATUS ───────────── */
  const toggleStatus = async promo => {
    if (promo.isActive) {
      await axios.put(`${BASE_URL}/${promo.id}/deactivate`, {}, getConfig());
    } else {
      await axios.put(`${BASE_URL}/${promo.id}/activate`, {}, getConfig());
    }

    await refetch();
  };

  /* ───────────── RETURN ───────────── */
  return {
    promotions,
    loading,
    error,
    refetch,
    savePromotion,
    toggleStatus
  };
}
