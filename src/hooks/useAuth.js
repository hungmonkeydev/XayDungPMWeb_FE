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
      // 1. Lấy user ra một cách an toàn (có dấu ?)
      const user = result.payload?.user; 
      
      // 2. In ra xem rốt cuộc Backend trả về cái gì
      console.log("Toàn bộ payload:", result.payload);
      console.log("Dữ liệu user lấy được:", user);

      // 3. CHẶN LỖI: Nếu user bị undefined thì dừng lại luôn, không chạy tiếp để khỏi sập web
      if (!user) {
        console.error("CẢNH BÁO: Đăng nhập thành công nhưng Backend không trả về thông tin user!");
        // Tạm thời cho về trang chủ để web không bị treo
        navigate("/"); 
        return; 
      }

      // 4. Nếu có user đàng hoàng thì mới đi check role
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