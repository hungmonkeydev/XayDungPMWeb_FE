const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

const getAuthHeader = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
});

// ---- LẤY DANH SÁCH ĐƠN HÀNG ----
export async function getOrdersAPI() {
  const res = await fetch(`${BASE_URL}/orders`, { headers: getAuthHeader() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Lỗi tải đơn hàng!");
  return json.data;
}

// ---- CHI TIẾT 1 ĐƠN HÀNG ----
export async function getOrderDetailAPI(orderId) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`, { headers: getAuthHeader() });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Lỗi tải chi tiết đơn hàng!");
  return json.data;
}

// ---- TẠO ĐƠN HÀNG ----
export async function createOrderAPI(orderData) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({
      customerName:    orderData.customerName,
      customerPhone:   orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      method:          orderData.method,
      note:            orderData.note,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Tạo đơn hàng thất bại!");
  return json.data;
}

// ---- HỦY ĐƠN HÀNG ----
export async function cancelOrderAPI(orderId) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
    method: "PUT",
    headers: getAuthHeader(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Hủy đơn hàng thất bại!");
  return json.data;
}

// ---- XÁC NHẬN NHẬN HÀNG ----
export async function confirmOrderAPI(orderId) {
  const res = await fetch(`${BASE_URL}/orders/${orderId}/confirm`, {
    method: "POST",
    headers: getAuthHeader(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Xác nhận thất bại!");
  return json.data;
}

// ---- TRA CỨU ĐƠN HÀNG ----
export async function trackOrderAPI(trackingNumber) {
  const res = await fetch(`${BASE_URL}/orders/tracking/${trackingNumber}`, {
    headers: getAuthHeader(),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Không tìm thấy đơn hàng!");
  return json.data;
}