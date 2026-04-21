// src/hooks/useOrdersAdmin.js
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api/admin/orders";

export default function useOrders() {
  const token = useSelector(state => state.auth.token);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  /* ───────── GET BY ID ───────── */
  const getById = async id => {
    if (!token) return null;

    try {
      const res = await axios.get(`${BASE_URL}/${id}`, getConfig());

      const o = res.data?.data?.result;
      if (!o) return null;

      return {
        id: o.id,
        code: `#${o.id}`,

        customerName: o.customerName,
        customerPhone: o.customerPhone,
        customerAddress: o.customerAddress,

        method: o.method?.toLowerCase(),
        status: o.status,

        totalPrice: o.totalPrice,
        discountAmount: o.discountAmount,
        subtotal: o.subtotal,

        note: o.note,
        createdAt: o.createdAt,

        details: Array.isArray(o.orderDetails) ? o.orderDetails : [],

        payment: {
          method: o.method === "vnpay" ? "VNPay" : "COD",
          status: o.method === "vnpay" ? "success" : "pending",
          transactionId: "N/A",
          amount: o.totalPrice
        }
      };
    } catch (err) {
      console.error("Get order by id error:", err);
      return null;
    }
  };

  /* ───────── GET LIST ───────── */
  const refetch = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${BASE_URL}/filter?page=1&limit=100`, getConfig());

      const data = res.data?.data?.result || [];

      const mapped = data.map(o => ({
        id: o.id,
        code: `#${o.id}`,

        customerName: o.customerName,
        customerPhone: o.customerPhone,

        method: o.method?.toLowerCase(),
        status: o.status,

        totalPrice: o.totalPrice,
        discountAmount: o.discountAmount,

        createdAt: o.createdAt,

        details: Array.isArray(o.orderDetails) ? o.orderDetails : []
      }));

      setOrders(mapped);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    orders,
    loading,
    error,
    refetch,
    getById
  };
}
