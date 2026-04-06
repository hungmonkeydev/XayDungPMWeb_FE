import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../hooks/useAuth";
import { InputField, ErrorBox, SubmitButton, Divider, GoogleButton, AuthCard, AuthPage } from "./authComponents";

export default function RegisterPage() {
  const [name, setName]               = useState("");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [localError, setLocalError]   = useState("");

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
    if (!name || !email || !password || !confirmPass) {
      setLocalError("Vui lòng điền đầy đủ thông tin!"); return;
    }
    if (password.length < 6) {
      setLocalError("Mật khẩu phải có ít nhất 6 ký tự!"); return;
    }
    if (password !== confirmPass) {
      setLocalError("Mật khẩu xác nhận không khớp!"); return;
    }
    await handleRegister(name, email, password);
  };

  return (
    <AuthPage>
      <AuthCard>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Đăng ký</h2>
        <p className="text-sm text-gray-400 mb-5">Tạo tài khoản mới</p>

        <InputField label="Họ và tên"          type="text"     value={name}        onChange={(v) => { clearAllErrors(); setName(v); }}        placeholder="Nguyễn Văn A" />
        <InputField label="Email"              type="email"    value={email}       onChange={(v) => { clearAllErrors(); setEmail(v); }}       placeholder="example@email.com" />
        <InputField label="Mật khẩu"           type="password" value={password}    onChange={(v) => { clearAllErrors(); setPassword(v); }}    placeholder="Tối thiểu 6 ký tự" />
        <InputField label="Xác nhận mật khẩu"  type="password" value={confirmPass} onChange={(v) => { clearAllErrors(); setConfirmPass(v); }} placeholder="Nhập lại mật khẩu" />

        {(localError || error) && <ErrorBox message={localError || error} />}

        <SubmitButton label="Đăng ký" loading={loading} onClick={handleSubmit} />
        <Divider />
        <GoogleButton loading={loading} onClick={handleGoogle} />

        <p className="text-center text-sm text-gray-500 mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-amber-500 hover:text-amber-600 font-medium transition-colors">
            Đăng nhập
          </Link>
        </p>
      </AuthCard>
    </AuthPage>
  );
}