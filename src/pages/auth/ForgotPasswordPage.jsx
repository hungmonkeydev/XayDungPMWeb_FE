import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../../services/authService";
import { InputField, ErrorBox, SubmitButton, styles } from "./authComponents";

export default function ForgotPasswordPage() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubmit = async () => {
    if (!email) { setError("Vui lòng nhập email!"); return; }
    setError(""); setLoading(true);
    try {
      await forgotPasswordAPI(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Quên mật khẩu</h2>

        {!sent ? (
          <>
            <p style={styles.subtitle}>Nhập email để nhận link đặt lại mật khẩu</p>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(v) => { setError(""); setEmail(v); }}
              placeholder="example@email.com"
            />
            {error && <ErrorBox message={error} />}
            <SubmitButton label="Gửi link đặt lại" loading={loading} onClick={handleSubmit} />
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
            <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
              Kiểm tra hộp thư của bạn!
            </p>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 4 }}>
              Chúng tôi đã gửi link đặt lại mật khẩu đến
            </p>
            <p style={{ fontWeight: 500, color: "#378ADD", marginBottom: 20 }}>
              {email}
            </p>
            <p style={{ color: "#aaa", fontSize: 13 }}>
              Không thấy email? Kiểm tra thư mục spam hoặc{" "}
              <span
                onClick={() => { setSent(false); }}
                style={{ color: "#378ADD", cursor: "pointer" }}
              >
                thử lại
              </span>
            </p>
          </div>
        )}

        <p style={{ ...styles.switchText, marginTop: 20 }}>
          <Link to="/login" style={styles.link}>← Quay lại đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}