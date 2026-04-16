// src/hooks/useProductAdmin.js
import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";
const LIMIT = 10;

export function useProducts() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: LIMIT, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/products?page=${pageNum}&limit=${LIMIT}&sortBy=createdAt&sortOrder=DESC`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json.data);
      setPagination(json.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page);
  }, [page, fetchProducts]);

  const createProduct = useCallback(async (data, adminToken) => {
    const res = await fetch(`${BASE_URL}/admin/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }, []);

  const updateProduct = useCallback(async (id, data, adminToken) => {
    const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }, []);

  const deleteProduct = useCallback(
    async (id, adminToken) => {
      const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchProducts(page);
    },
    [page, fetchProducts]
  );

  return { data, pagination, page, setPage, loading, error, refetch: fetchProducts, createProduct, updateProduct, deleteProduct };
}
