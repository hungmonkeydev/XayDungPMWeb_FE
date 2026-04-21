// src/hooks/useFormOptions.js

import { useState, useEffect } from "react";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

export function useFormOptions() {
  const [colors, setColors] = useState([]);
  const [dimensions, setDimensions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const [cRes, dRes, catRes] = await Promise.all([
          fetch(`${BASE_URL}/colors`),
          fetch(`${BASE_URL}/dimensions`),
          fetch(`${BASE_URL}/categories`) // dùng endpoint categories thực
        ]);
        if (!cRes.ok || !dRes.ok || !catRes.ok) throw new Error("Lỗi tải dữ liệu");
        const [c, d, cat] = await Promise.all([cRes.json(), dRes.json(), catRes.json()]);
        setColors(c.data);
        setDimensions(d.data);
        setCategories(cat.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { colors, dimensions, categories, loading, error };
}
