const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

// ---- TẠO THANH TOÁN VNPAY ----
export async function createVNPayPaymentAPI(orderId) {
  // orderId là query param, không phải body
  const res = await fetch(`${BASE_URL}/payments/vnpay/create?orderId=${orderId}`, {
    method: "POST",
    headers: getAuthHeader(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Tạo thanh toán thất bại!");
  return json.data; // { paymentUrl }
}

// ---- XÁC NHẬN COD ----
export async function confirmCODAPI(orderId) {
  const res = await fetch(`${BASE_URL}/payments/cod/confirm`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ orderId }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Xác nhận COD thất bại!");
  return json.data;
}

// ---- TRẠNG THÁI THANH TOÁN ----
export async function getPaymentStatusAPI(paymentId) {
  const res = await fetch(`${BASE_URL}/payments/${paymentId}/status`, {
    headers: getAuthHeader(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Lỗi tải trạng thái thanh toán!");
  return json.data;
}

// ---- THANH TOÁN THEO ĐƠN HÀNG ----
export async function getPaymentByOrderAPI(orderId) {
  const res = await fetch(`${BASE_URL}/payments/order/${orderId}`, {
    headers: getAuthHeader(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Lỗi tải thanh toán!");
  return json.data;
}