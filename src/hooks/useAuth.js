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
    if (login.fulfilled.match(result)) navigate("/");
  };

  // ---- ĐĂNG KÝ (thêm soDienThoai, diaChi) ----
  const handleRegister = async (hoTen, email, password, soDienThoai, diaChi) => {
    const result = await dispatch(register({ hoTen, email, password, soDienThoai, diaChi }));
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