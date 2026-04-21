//src/services/authService.js
const BASE_URL = "https://xaydungwebnoithat-backend.onrender.com/api";

// ---- ĐĂNG NHẬP ----
export async function loginAPI(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Đăng nhập thất bại!");
  return {
    access_token: json.data.token,
    user: json.data.customer || json.data.user || json.data.auth
  };
}

// ---- ĐĂNG KÝ ----
export async function registerAPI(name, email, password) {
  const res = await fetch(`${BASE_URL}/customers/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Đăng ký thất bại!");
  return json;
}

// ---- ĐĂNG NHẬP GOOGLE ----
export async function loginGoogleAPI(googleToken) {
  // Lấy thông tin user từ Google trước
  const userInfoRes = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: `Bearer ${googleToken}` } }
  );
  const userInfo = await userInfoRes.json();

  // Gửi lên BE theo đúng format Postman yêu cầu
  const res = await fetch(`${BASE_URL}/customers/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idGoogle: userInfo.sub,   // Google ID duy nhất
      email:    userInfo.email,
      name:     userInfo.name,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Đăng nhập Google thất bại!");
  return {
    access_token: json.data.token,
    user: json.data.customer,
  };
}

// ---- QUÊN MẬT KHẨU ----
export async function forgotPasswordAPI(email) {
  const res = await fetch(`${BASE_URL}/customers/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Có lỗi xảy ra!");
  return json;
}


// ---- ĐĂNG XUẤT (gọi API để BE ghi log nếu cần) ----
export async function logoutAPI(token) {
  try {
    await fetch(`${BASE_URL}/customers/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  } catch {
    // Dù API lỗi vẫn xóa token phía client
  }
}
