// src/hooks/useProductForm.js

import { useState, useEffect } from "react";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

const emptyAttribute = () => ({
  _key: Math.random().toString(36).slice(2),
  colorId: "",
  dimensionsId: "",
  name: "",
  price: "",
  stock: ""
});

function normalizeAttributes(productAttributes = []) {
  return productAttributes.map(a => ({
    _key: String(a.id),
    id: a.id, // giữ id gốc cho edit
    colorId: String(a.colorId),
    dimensionsId: String(a.dimensionsId),
    name: a.name ?? "",
    price: a.price ?? "",
    stock: a.stock ?? ""
  }));
}

export function useProductForm(id) {
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    description: "",
    status: "active"
  });
  const [attributes, setAttributes] = useState([emptyAttribute()]);
  const [existingImages, setExistingImages] = useState([]); // ProductImages từ API
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEdit) return;
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/products/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const p = json.data;
        setForm({
          name: p.name ?? "",
          categoryId: String(p.categoryId ?? ""),
          description: p.description ?? "",
          status: p.status ?? "active"
        });
        setAttributes(p.ProductAttributes?.length ? normalizeAttributes(p.ProductAttributes) : [emptyAttribute()]);
        setExistingImages(p.ProductImages ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, isEdit]);

  return {
    form,
    setForm,
    attributes,
    setAttributes,
    existingImages,
    setExistingImages,
    loading,
    error,
    emptyAttribute
  };
}
