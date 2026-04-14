// ---- KIỂM TRA EMAIL ----
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---- KIỂM TRA SỐ ĐIỆN THOẠI ----
// Việt Nam: 10 số, bắt đầu bằng 0
export function isValidPhone(phone) {
  return /^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone);
}

// ---- KIỂM TRA MẬT KHẨU ----
export function isValidPassword(password) {
  return password.length >= 6;
}

// ---- KIỂM TRA OTP ----
export function isValidOtp(otp) {
  return /^[0-9]{6}$/.test(otp);
}

// ---- KIỂM TRA KHÔNG ĐƯỢC TRỐNG ----
export function isEmpty(value) {
  return !value || value.trim() === "";
}

// ---- VALIDATE FORM ĐĂNG NHẬP ----
export function validateLoginForm({ email, password }) {
  if (isEmpty(email))         return "Vui lòng nhập email!";
  if (!isValidEmail(email))   return "Email không đúng định dạng!";
  if (isEmpty(password))      return "Vui lòng nhập mật khẩu!";
  return null; // null = không có lỗi
}

// ---- VALIDATE FORM ĐĂNG KÝ ----
export function validateRegisterForm({ name, email, password, confirmPass }) {
  if (isEmpty(name))               return "Vui lòng nhập họ và tên!";
  if (isEmpty(email))              return "Vui lòng nhập email!";
  if (!isValidEmail(email))        return "Email không đúng định dạng!";
  if (isEmpty(password))           return "Vui lòng nhập mật khẩu!";
  if (!isValidPassword(password))  return "Mật khẩu phải có ít nhất 6 ký tự!";
  if (password !== confirmPass)    return "Mật khẩu xác nhận không khớp!";
  return null;
}

// ---- VALIDATE FORM QUÊN MẬT KHẨU ----
export function validateForgotForm({ email }) {
  if (isEmpty(email))        return "Vui lòng nhập email!";
  if (!isValidEmail(email))  return "Email không đúng định dạng!";
  return null;
}

// ---- VALIDATE OTP ----
export function validateOtp({ otp }) {
  if (isEmpty(otp))        return "Vui lòng nhập mã OTP!";
  if (!isValidOtp(otp))    return "Mã OTP gồm 6 chữ số!";
  return null;
}

// ---- VALIDATE MẬT KHẨU MỚI ----
export function validateNewPassword({ newPassword, confirmPass }) {
  if (isEmpty(newPassword))           return "Vui lòng nhập mật khẩu mới!";
  if (!isValidPassword(newPassword))  return "Mật khẩu phải có ít nhất 6 ký tự!";
  if (newPassword !== confirmPass)    return "Mật khẩu xác nhận không khớp!";
  return null;
}

// ---- VALIDATE FORM CHECKOUT ----
export function validateCheckoutForm({ hoTen, soDienThoai, diaChi, tinhThanh }) {
  if (isEmpty(hoTen))                return "Vui lòng nhập họ và tên!";
  if (isEmpty(soDienThoai))          return "Vui lòng nhập số điện thoại!";
  if (!isValidPhone(soDienThoai))    return "Số điện thoại không đúng định dạng!";
  if (isEmpty(diaChi))               return "Vui lòng nhập địa chỉ!";
  if (diaChi.trim().length < 10)     return "Địa chỉ quá ngắn, vui lòng nhập đầy đủ!";
  if (isEmpty(tinhThanh))            return "Vui lòng nhập Tỉnh/TP!";
  return null;
}

// ---- VALIDATE FORM PROFILE ----
export function validateProfileForm({ name, soDienThoai }) {
  if (isEmpty(name))                 return "Vui lòng nhập họ và tên!";
  if (soDienThoai && !isValidPhone(soDienThoai)) return "Số điện thoại không đúng định dạng!";
  return null;
}

// ---- VALIDATE FORM ĐỊA CHỈ ----
export function validateAddressForm({ hoTen, soDienThoai, diaChi }) {
  if (isEmpty(hoTen))               return "Vui lòng nhập họ và tên!";
  if (isEmpty(soDienThoai))         return "Vui lòng nhập số điện thoại!";
  if (!isValidPhone(soDienThoai))   return "Số điện thoại không đúng định dạng!";
  if (isEmpty(diaChi))              return "Vui lòng nhập địa chỉ!";
  if (diaChi.trim().length < 10)    return "Địa chỉ quá ngắn, vui lòng nhập đầy đủ!";
  return null;
}