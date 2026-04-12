import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { InputField, ErrorBox, SubmitButton, Divider, GoogleButton, AuthCard, AuthPage } from "./authComponents";

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
    <AuthPage>
      <AuthCard>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Đăng nhập</h2>
        <p className="text-sm text-gray-400 mb-5">Chào mừng bạn quay trở lại!</p>

        <InputField label="Email"     type="email"    value={email}    onChange={(v) => { handleClearError(); setEmail(v); }}    placeholder="example@email.com" />
        <InputField label="Mật khẩu" type="password" value={password} onChange={(v) => { handleClearError(); setPassword(v); }} placeholder="Nhập mật khẩu" />

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-sm text-amber-500 hover:text-amber-600 transition-colors">
            Quên mật khẩu?
          </Link>
        </div>

        {error && <ErrorBox message={error} />}

        <SubmitButton label="Đăng nhập" loading={loading} onClick={() => handleLogin(email, password)} />
        <Divider />
        <GoogleButton loading={loading} onClick={handleGoogle} />

        <p className="text-center text-sm text-gray-500 mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-amber-500 hover:text-amber-600 font-medium transition-colors">
            Đăng ký ngay
          </Link>
        </p>
      </AuthCard>
    </AuthPage>
  );
}