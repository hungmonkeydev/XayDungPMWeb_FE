import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../../services/authService";
import { InputField, ErrorBox, SubmitButton, AuthCard, AuthPage } from "./authComponents";

export default function ForgotPasswordPage() {
  const [step, setStep]               = useState(1);
  const [email, setEmail]             = useState("");
  const [otp, setOtp]                 = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);

  // ---- BƯỚC 1: Gửi OTP ----
  const handleSendOtp = async () => {
    if (!email) { setError("Vui lòng nhập email!"); return; }
    setError(""); setLoading(true);
    try {
      await forgotPasswordAPI(email);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- BƯỚC 2: Xác nhận OTP ----
  const handleVerifyOtp = async () => {
    if (!otp) { setError("Vui lòng nhập mã OTP!"); return; }
    if (otp.length !== 6) { setError("Mã OTP gồm 6 chữ số!"); return; }
    setError(""); setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // TODO: gọi API verify OTP
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---- BƯỚC 3: Đặt mật khẩu mới ----
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPass) { setError("Vui lòng điền đầy đủ!"); return; }
    if (newPassword.length < 6) { setError("Mật khẩu phải có ít nhất 6 ký tự!"); return; }
    if (newPassword !== confirmPass) { setError("Mật khẩu xác nhận không khớp!"); return; }
    setError(""); setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800)); // TODO: gọi API reset password
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthCard>

        {/* THANH TIẾN TRÌNH */}
        <StepIndicator step={step} />

        <h2 className="text-2xl font-bold text-gray-800 mb-1">Quên mật khẩu</h2>

        {/* ---- BƯỚC 1: NHẬP EMAIL ---- */}
        {step === 1 && (
          <>
            <p className="text-sm text-gray-400 mb-5">Nhập email để nhận mã OTP</p>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(v) => { setError(""); setEmail(v); }}
              placeholder="example@email.com"
            />
            {error && <ErrorBox message={error} />}
            <SubmitButton label="Gửi mã OTP" loading={loading} onClick={handleSendOtp} />
          </>
        )}

        {/* ---- BƯỚC 2: NHẬP OTP ---- */}
        {step === 2 && (
          <>
            <p className="text-sm text-gray-400 mb-5">
              Mã OTP đã gửi đến <strong className="text-gray-700">{email}</strong>
            </p>
            <OtpInput value={otp} onChange={(v) => { setError(""); setOtp(v); }} />
            {error && <ErrorBox message={error} />}
            <SubmitButton label="Xác nhận OTP" loading={loading} onClick={handleVerifyOtp} />
            <button
              onClick={() => { setStep(1); setOtp(""); setError(""); }}
              className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Đổi email khác
            </button>
            <ResendOtp email={email} />
          </>
        )}

        {/* ---- BƯỚC 3: ĐẶT MẬT KHẨU MỚI ---- */}
        {step === 3 && !success && (
          <>
            <p className="text-sm text-gray-400 mb-5">Tạo mật khẩu mới cho tài khoản</p>
            <InputField
              label="Mật khẩu mới"
              type="password"
              value={newPassword}
              onChange={(v) => { setError(""); setNewPassword(v); }}
              placeholder="Tối thiểu 6 ký tự"
            />
            <InputField
              label="Xác nhận mật khẩu"
              type="password"
              value={confirmPass}
              onChange={(v) => { setError(""); setConfirmPass(v); }}
              placeholder="Nhập lại mật khẩu mới"
            />
            {error && <ErrorBox message={error} />}
            <SubmitButton label="Đặt lại mật khẩu" loading={loading} onClick={handleResetPassword} />
          </>
        )}

        {/* ---- THÀNH CÔNG ---- */}
        {success && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-bold text-gray-800 text-base mb-2">Đặt lại mật khẩu thành công!</p>
            <p className="text-gray-400 text-sm mb-6">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
            <Link to="/login">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg text-sm uppercase transition-colors">
                Đăng nhập ngay
              </button>
            </Link>
          </div>
        )}

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/login" className="text-amber-500 hover:text-amber-600 transition-colors">
            ← Quay lại đăng nhập
          </Link>
        </p>

      </AuthCard>
    </AuthPage>
  );
}

// ---- THANH TIẾN TRÌNH ----
function StepIndicator({ step }) {
  const steps = ["Nhập email", "Xác nhận OTP", "Mật khẩu mới"];
  return (
    <div className="flex items-center mb-6">
      {steps.map((label, i) => {
        const num    = i + 1;
        const active = step === num;
        const done   = step > num;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                ${done || active ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-400"}`}
              >
                {done ? "✓" : num}
              </div>
              <span className={`text-[10px] whitespace-nowrap transition-colors
                ${active ? "text-amber-500 font-medium" : done ? "text-amber-500" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors
                ${done ? "bg-amber-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- Ô NHẬP OTP ----
function OtpInput({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">Mã OTP</label>
      <input
        type="text"
        value={value}
        maxLength={6}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        placeholder="Nhập mã 6 chữ số"
        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-xl text-center tracking-widest font-bold outline-none focus:border-amber-500 transition-colors"
      />
      <p className="text-xs text-gray-400 mt-1">Mã OTP có hiệu lực trong 5 phút</p>
    </div>
  );
}

// ---- GỬI LẠI OTP ----
function ResendOtp({ email }) {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useState(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false); setCountdown(60);
    alert(`Đã gửi lại mã OTP đến ${email}`);
    // TODO: gọi lại API gửi OTP
  };

  return (
    <p className="text-center text-xs text-gray-400 mt-3">
      Không nhận được mã?{" "}
      {canResend ? (
        <span onClick={handleResend} className="text-amber-500 hover:text-amber-600 cursor-pointer transition-colors">
          Gửi lại
        </span>
      ) : (
        <span className="text-gray-300">Gửi lại sau {countdown}s</span>
      )}
    </p>
  );
}