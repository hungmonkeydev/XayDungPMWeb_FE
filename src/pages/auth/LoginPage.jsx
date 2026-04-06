import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { InputField, ErrorBox, SubmitButton, Divider, GoogleButton, styles } from "./authComponents";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleLoginGoogle, loading, error, handleClearError, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (isLoggedIn) navigate("/"); }, [isLoggedIn]);

  const handleGoogle = useGoogleLogin({
    onSuccess: async (res) => await handleLoginGoogle(res.access_token),
    onError: () => alert("Đăng nhập Google thất bại!"),
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Đăng nhập</h2>
        <p style={styles.subtitle}>Chào mừng bạn quay trở lại!</p>

        <InputField label="Email"     type="email"    value={email}    onChange={(v) => { handleClearError(); setEmail(v); }}    placeholder="example@email.com" />
        <InputField label="Mật khẩu" type="password" value={password} onChange={(v) => { handleClearError(); setPassword(v); }} placeholder="Nhập mật khẩu" />

        <div style={{ textAlign: "right", marginBottom: 14 }}>
          <Link to="/forgot-password" style={styles.link}>Quên mật khẩu?</Link>
        </div>

        {error && <ErrorBox message={error} />}

        <SubmitButton label="Đăng nhập" loading={loading} onClick={() => handleLogin(email, password)} />
        <Divider />
        <GoogleButton loading={loading} onClick={handleGoogle} />

        <p style={styles.switchText}>
          Chưa có tài khoản? <Link to="/register" style={styles.link}>Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}