import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register, loginGoogle, logout, clearError } from "../store/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const isLoggedIn = !!token;

  // ---- ĐĂNG NHẬP ----
  const handleLogin = async (email, password) => {
  const result = await dispatch(login({ email, password }));
  if (login.fulfilled.match(result)) {
    const user = result.payload.user;

    // Kiểm tra role để chuyển trang phù hợp
    if (user.role === "ROLE_ADMIN" || user.role === "ROLE_STAFF") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }
};
  // ---- ĐĂNG KÝ ----
  const handleRegister = async (name, email, password) => { // ← bỏ soDienThoai, diaChi
  const result = await dispatch(register({ name, email, password }));
  if (register.fulfilled.match(result)) navigate("/login");
};

  // ---- ĐĂNG NHẬP GOOGLE ----
  const handleLoginGoogle = async (googleToken) => {
    const result = await dispatch(loginGoogle(googleToken));
    if (loginGoogle.fulfilled.match(result)) navigate("/");
  };

  // ---- ĐĂNG XUẤT ----
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  // ---- XÓA LỖI ----
  const handleClearError = () => dispatch(clearError());

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    handleLogin,
    handleRegister,
    handleLoginGoogle,
    handleLogout,
    handleClearError,
  };
}