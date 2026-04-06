export function InputField({ label, type, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 13, color: "#555", display: "block", marginBottom: 4 }}>{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%", padding: "9px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
      />
    </div>
  );
}

export function ErrorBox({ message }) {
  return (
    <div style={{ background: "#fff0f0", color: "#c0392b", border: "1px solid #f5c6c6", borderRadius: 8, padding: "8px 12px", fontSize: 13, marginBottom: 12 }}>
      {message}
    </div>
  );
}

export function SubmitButton({ label, loading, onClick }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      width: "100%", padding: 11, background: "#378ADD", color: "#fff",
      border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer",
    }}>
      {loading ? "Đang xử lý..." : label}
    </button>
  );
}

export function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "14px 0" }}>
      <div style={{ flex: 1, height: 1, background: "#ddd" }} />
      <span style={{ fontSize: 12, color: "#aaa" }}>hoặc</span>
      <div style={{ flex: 1, height: 1, background: "#ddd" }} />
    </div>
  );
}

export function GoogleButton({ loading, onClick }) {
  return (
    <button onClick={onClick} disabled={loading} style={{
      width: "100%", padding: 11, background: "#fff", color: "#333",
      border: "1px solid #ddd", borderRadius: 8, fontSize: 14, fontWeight: 500,
      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    }}>
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      {loading ? "Đang xử lý..." : "Tiếp tục với Google"}
    </button>
  );
}

export const styles = {
  page:       { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f7fa", padding: 16 },
  card:       { width: "100%", maxWidth: 420, background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 28 },
  title:      { fontSize: 22, fontWeight: 600, margin: "0 0 4px", color: "#1a1a1a" },
  subtitle:   { fontSize: 14, color: "#888", margin: "0 0 20px" },
  link:       { color: "#378ADD", textDecoration: "none" },
  switchText: { textAlign: "center", fontSize: 13, marginTop: 16, color: "#555" },
};