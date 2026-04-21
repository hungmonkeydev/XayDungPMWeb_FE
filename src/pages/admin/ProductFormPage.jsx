// src/pages/admin/ProductFormPage.jsx

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useProductForm } from "../../hooks/useProductForm";
import { useFormOptions } from "../../hooks/useFormOptions";

const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

/* ── UI helpers ── */
function InputField({ label, required, children, hint }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-stone-700">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-stone-400">{hint}</p>}
    </div>
  );
}

function SectionCard({ title, description, children }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-100 bg-stone-50/60">
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
        {description && <p className="text-xs text-stone-400 mt-0.5">{description}</p>}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ── Image Manager (edit mode: hiển thị ảnh hiện có + upload thêm) ── */
function ImageManager({ productId, existingImages, setExistingImages, adminToken }) {
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState(null);

  const handleUpload = async e => {
    const file = e.target.files?.[0];
    if (!file || !productId) return;
    setUploading(true);
    setUploadErr(null);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("productId", String(productId));
      fd.append("isMain", existingImages.length === 0 ? "true" : "false");

      const res = await fetch(`${BASE_URL}/admin/product-images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      // Thêm ảnh mới vào danh sách
      setExistingImages(prev => [...prev, json.data]);
    } catch (err) {
      setUploadErr("Upload thất bại: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async imageId => {
    if (!window.confirm("Xoá ảnh này?")) return;
    try {
      const res = await fetch(`${BASE_URL}/admin/product-images/${imageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setExistingImages(prev => prev.filter(img => img.id !== imageId));
    } catch (err) {
      alert("Xoá ảnh thất bại: " + err.message);
    }
  };

  return (
    <div className="space-y-3">
      {/* Existing images */}
      {existingImages.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {existingImages.map(img => (
            <div key={img.id} className="relative group w-24 h-24">
              <img src={img.imageUrl} alt="" className="w-full h-full object-cover rounded-xl border border-stone-200" />
              <button
                type="button"
                onClick={() => handleDelete(img.id)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      <label
        className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-xl transition-colors
        ${uploading ? "border-stone-300 bg-stone-50 cursor-wait" : "border-stone-200 cursor-pointer hover:border-stone-400 hover:bg-stone-50"}`}
      >
        {uploading ? (
          <>
            <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin mb-2" />
            <p className="text-xs text-stone-400">Đang tải lên...</p>
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-stone-400 mb-2"
            >
              <path d="M4 16l4-4 4 4M12 12l4-4 4 4" />
              <path d="M4 20h16M12 12V4" />
            </svg>
            <p className="text-xs font-medium text-stone-600">Click để tải ảnh lên</p>
            <p className="text-[10px] text-stone-400 mt-0.5">PNG, JPG tối đa 5MB</p>
          </>
        )}
        <input type="file" accept="image/*" className="sr-only" onChange={handleUpload} disabled={uploading} />
      </label>

      {/* Thông báo: tạo mới chưa có productId */}
      {!productId && (
        <p className="text-[11px] text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">Ảnh sẽ có thể upload sau khi tạo sản phẩm thành công.</p>
      )}
      {uploadErr && <p className="text-[11px] text-rose-500">{uploadErr}</p>}
    </div>
  );
}

/* ── Main component ── */
export default function ProductFormPage() {
  const token = useSelector(state => state.auth.token);

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const { form, setForm, attributes, setAttributes, existingImages, setExistingImages, loading: formLoading, error: formError, emptyAttribute } = useProductForm(id);

  const { colors, dimensions, categories, loading: optLoading, error: optError } = useFormOptions();

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState(null);

  /* ── Handlers ── */
  const handleForm = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleAttr = (key, idx) => e => setAttributes(prev => prev.map((a, i) => (i === idx ? { ...a, [key]: e.target.value } : a)));

  const addAttribute = () => setAttributes(a => [...a, emptyAttribute()]);
  const removeAttribute = idx => setAttributes(a => a.filter((_, i) => i !== idx));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tên sản phẩm không được trống";
    if (!form.categoryId) e.categoryId = "Vui lòng chọn danh mục";
    if (!form.description.trim()) e.description = "Mô tả không được trống";
    attributes.forEach((a, i) => {
      if (!a.colorId) e[`attr_${i}_color`] = "Chọn màu";
      if (!a.dimensionsId) e[`attr_${i}_dim`] = "Chọn kích thước";
      if (!a.price) e[`attr_${i}_price`] = "Nhập giá";
      if (a.stock === "") e[`attr_${i}_stock`] = "Nhập tồn kho";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitErr(null);

    try {
      const body = {
        categoryId: Number(form.categoryId),
        name: form.name.trim(),
        description: form.description.trim(),
        // status không có trong Create API — chỉ truyền nếu là edit
        ...(isEdit && { status: form.status }),
        productAttributes: attributes.map(a => ({
          ...(a.id && { id: a.id }), // giữ id nếu edit
          colorId: Number(a.colorId),
          dimensionsId: Number(a.dimensionsId),
          name: a.name.trim() || "",
          price: a.price ? String(a.price) : null,
          stock: Number(a.stock)
        }))
      };

      const url = isEdit ? `${BASE_URL}/admin/products/${id}` : `${BASE_URL}/admin/products`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message ?? `HTTP ${res.status}`);
      }

      navigate("/admin/products");
    } catch (err) {
      setSubmitErr(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading / Error states ── */
  const isLoading = formLoading || optLoading;
  const loadError = formError || optError;

  if (isLoading) {
    return (
      <div className="p-6 flex items-center gap-3 text-stone-400">
        <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
        <span className="text-sm">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="p-6">
        <div className="bg-rose-50 text-rose-700 text-sm px-4 py-3 rounded-xl border border-rose-100">Lỗi tải dữ liệu: {loadError}</div>
      </div>
    );
  }

  /* ── Render ── */
  return (
    <div className="p-6 max-w-[900px] space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/products")}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M10 4L6 8l4 4" />
          </svg>
        </button>
        <div>
          <h2 className="text-lg font-bold text-stone-900 tracking-tight">{isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
          <p className="text-xs text-stone-400 mt-0.5">{isEdit ? `Đang chỉnh sửa: ${form.name}` : "Điền thông tin và thêm biến thể sản phẩm"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* ── Basic info ── */}
        <SectionCard title="Thông tin cơ bản" description="Tên, danh mục và mô tả sản phẩm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <InputField label="Tên sản phẩm" required>
              <input
                type="text"
                placeholder="VD: Ghế sofa L Milan"
                value={form.name}
                onChange={handleForm("name")}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none transition-colors w-full
                  ${errors.name ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-500"}`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </InputField>

            {/* Category */}
            <InputField label="Danh mục" required>
              <select
                value={form.categoryId}
                onChange={handleForm("categoryId")}
                className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 outline-none cursor-pointer w-full transition-colors
                  ${errors.categoryId ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-500"}`}
              >
                <option value="">Chọn danh mục...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <p className="text-[11px] text-rose-500 mt-1">{errors.categoryId}</p>}
            </InputField>

            {/* Description */}
            <div className="sm:col-span-2">
              <InputField label="Mô tả sản phẩm" required>
                <textarea
                  rows={4}
                  placeholder="Mô tả chất liệu, kích thước, tính năng nổi bật..."
                  value={form.description}
                  onChange={handleForm("description")}
                  className={`border rounded-lg px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 outline-none resize-none w-full transition-colors
                    ${errors.description ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-500"}`}
                />
                {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
              </InputField>
            </div>

            {/* Status — chỉ hiện khi edit vì API tạo mới không nhận status */}
            {isEdit && (
              <InputField label="Trạng thái">
                <div className="flex gap-3">
                  {[
                    { value: "active", label: "Đang bán" },
                    { value: "inactive", label: "Ngừng bán" }
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm font-medium flex-1 justify-center
                        ${form.status === opt.value ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 text-stone-600 hover:bg-stone-50"}`}
                    >
                      <input type="radio" name="status" value={opt.value} checked={form.status === opt.value} onChange={handleForm("status")} className="sr-only" />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </InputField>
            )}
          </div>
        </SectionCard>

        {/* ── Ảnh sản phẩm ── */}
        <SectionCard title="Ảnh sản phẩm" description="Ảnh đại diện chính của sản phẩm">
          <ImageManager productId={isEdit ? Number(id) : null} existingImages={existingImages} setExistingImages={setExistingImages} adminToken={token} />
        </SectionCard>

        {/* ── Biến thể ── */}
        <SectionCard title="Biến thể sản phẩm" description="Mỗi biến thể là tổ hợp màu sắc + kích thước với giá và tồn kho riêng">
          <div className="space-y-3">
            {attributes.map((attr, idx) => (
              <div key={attr._key} className="border border-stone-100 rounded-xl p-4 bg-stone-50/40">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-stone-600">Biến thể #{idx + 1}</p>
                  {attributes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAttribute(idx)}
                      className="text-[11px] text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors"
                    >
                      Xoá
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {/* Color */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Màu sắc <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={attr.colorId}
                      onChange={handleAttr("colorId", idx)}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 outline-none w-full
                        ${errors[`attr_${idx}_color`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white"}`}
                    >
                      <option value="">Chọn màu</option>
                      {colors.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {/* Color preview dot */}
                    {attr.colorId && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-3 h-3 rounded-full border border-stone-200 flex-shrink-0"
                          style={{ background: colors.find(c => c.id === Number(attr.colorId))?.hexCode ?? "#ccc" }}
                        />
                        <span className="text-[10px] text-stone-500">{colors.find(c => c.id === Number(attr.colorId))?.hexCode}</span>
                      </div>
                    )}
                    {errors[`attr_${idx}_color`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_color`]}</p>}
                  </div>

                  {/* Dimensions */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Kích thước <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={attr.dimensionsId}
                      onChange={handleAttr("dimensionsId", idx)}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 outline-none w-full
                        ${errors[`attr_${idx}_dim`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white"}`}
                    >
                      <option value="">Chọn size</option>
                      {dimensions.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    {errors[`attr_${idx}_dim`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_dim`]}</p>}
                  </div>

                  {/* Custom name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">Tên biến thể</label>
                    <input
                      type="text"
                      placeholder="Tự động tạo nếu trống"
                      value={attr.name}
                      onChange={handleAttr("name", idx)}
                      className="border border-stone-200 bg-white rounded-lg px-2.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none w-full focus:border-stone-400"
                    />
                  </div>

                  {/* Price */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Giá bán (₫) <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="VD: 12400000"
                      value={attr.price}
                      onChange={handleAttr("price", idx)}
                      min={0}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none w-full
                        ${errors[`attr_${idx}_price`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-400"}`}
                    />
                    {errors[`attr_${idx}_price`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_price`]}</p>}
                  </div>

                  {/* Stock */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Tồn kho <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="VD: 10"
                      value={attr.stock}
                      onChange={handleAttr("stock", idx)}
                      min={0}
                      className={`border rounded-lg px-2.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 outline-none w-full
                        ${errors[`attr_${idx}_stock`] ? "border-rose-400 bg-rose-50" : "border-stone-200 bg-white focus:border-stone-400"}`}
                    />
                    {errors[`attr_${idx}_stock`] && <p className="text-[10px] text-rose-500">{errors[`attr_${idx}_stock`]}</p>}
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addAttribute}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-stone-200 rounded-xl text-sm text-stone-500 font-medium hover:border-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                <path d="M8 2v12M2 8h12" />
              </svg>
              Thêm biến thể
            </button>
          </div>
        </SectionCard>

        {/* ── Submit error ── */}
        {submitErr && <div className="bg-rose-50 text-rose-700 text-sm px-4 py-3 rounded-xl border border-rose-100">{submitErr}</div>}

        {/* ── Submit bar ── */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
          >
            Huỷ
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting && <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {isEdit ? "Lưu thay đổi" : "Tạo sản phẩm"}
          </button>
        </div>
      </form>
    </div>
  );
}
