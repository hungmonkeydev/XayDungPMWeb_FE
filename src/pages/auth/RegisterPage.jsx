import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { InputField, ErrorBox, SubmitButton, Divider, GoogleButton, styles } from "./authComponents";

export default function RegisterPage() {
  const [hoTen, setHoTen]               = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPass, setConfirmPass]   = useState("");
  const [soDienThoai, setSoDienThoai]   = useState("");
  const [diaChi, setDiaChi]             = useState("");
  const [localError, setLocalError]     = useState("");

  const { handleRegister, handleLoginGoogle, loading, error, handleClearError, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (isLoggedIn) navigate("/"); }, [isLoggedIn]);

  const clearAllErrors = () => { handleClearError(); setLocalError(""); };

  const handleGoogle = useGoogleLogin({
    onSuccess: async (res) => await handleLoginGoogle(res.access_token),
    onError: () => alert("Đăng nhập Google thất bại!"),
  });

  const handleSubmit = async () => {
    setLocalError("");
    if (!hoTen || !email || !password || !confirmPass || !soDienThoai || !diaChi) {
      setLocalError("Vui lòng điền đầy đủ thông tin!"); return;
    }
    if (password.length < 6) {
      setLocalError("Mật khẩu phải có ít nhất 6 ký tự!"); return;
    }
    if (password !== confirmPass) {
      setLocalError("Mật khẩu xác nhận không khớp!"); return;
    }
    await handleRegister(hoTen, email, password, soDienThoai, diaChi);
  };

  const displayError = localError || error;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Đăng ký</h2>
        <p style={styles.subtitle}>Tạo tài khoản mới</p>

        <InputField label="Họ và tên"      type="text"     value={hoTen}       onChange={(v) => { clearAllErrors(); setHoTen(v); }}       placeholder="Nguyễn Văn A" />
        <InputField label="Email"          type="email"    value={email}       onChange={(v) => { clearAllErrors(); setEmail(v); }}       placeholder="example@email.com" />
        <InputField label="Số điện thoại"  type="text"     value={soDienThoai} onChange={(v) => { clearAllErrors(); setSoDienThoai(v); }} placeholder="0901234567" />
        <InputField label="Địa chỉ"        type="text"     value={diaChi}      onChange={(v) => { clearAllErrors(); setDiaChi(v); }}      placeholder="123 Đường ABC, Quận 1, TP.HCM" />
        <InputField label="Mật khẩu"       type="password" value={password}    onChange={(v) => { clearAllErrors(); setPassword(v); }}    placeholder="Tối thiểu 6 ký tự" />
        <InputField label="Xác nhận mật khẩu" type="password" value={confirmPass} onChange={(v) => { clearAllErrors(); setConfirmPass(v); }} placeholder="Nhập lại mật khẩu" />

        {displayError && <ErrorBox message={displayError} />}

        <SubmitButton label="Đăng ký" loading={loading} onClick={handleSubmit} />
        <Divider />
        <GoogleButton loading={loading} onClick={handleGoogle} />

        <p style={styles.switchText}>
          Đã có tài khoản? <Link to="/login" style={styles.link}>Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}