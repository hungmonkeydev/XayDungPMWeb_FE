import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, loginGoogleAPI, logoutAPI } from "../services/authService";

// ---- ĐĂNG NHẬP ----
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try { return await loginAPI(email, password); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ---- ĐĂNG KÝ ----
export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => { // ← bỏ soDienThoai, diaChi
    try { return await registerAPI(name, email, password); }
    catch (err) { return rejectWithValue(err.message); }
  }
);
// ---- ĐĂNG NHẬP GOOGLE ----
export const loginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (googleToken, { rejectWithValue }) => {
    try { return await loginGoogleAPI(googleToken); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ---- ĐĂNG XUẤT ----
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState }) => {
    const token = getState().auth.token;
    await logoutAPI(token);
  }
);

// ---- SLICE ----
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:    JSON.parse(localStorage.getItem("user")) || null,
    token:   localStorage.getItem("token") || null,
    loading: false,
    error:   null,
  },
  reducers: {
    clearError(state) { state.error = null; },
  },
  extraReducers: (builder) => {

    // Helper lưu thông tin sau khi đăng nhập thành công
    const handleLoginSuccess = (state, action) => {
      state.loading        = false;
      state.error          = null;
      state.token          = action.payload.access_token;
      state.user           = action.payload.user;
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user",  JSON.stringify(action.payload.user));
    };

    builder
      // --- LOGIN ---
      .addCase(login.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(login.fulfilled, handleLoginSuccess)
      .addCase(login.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- REGISTER ---
      .addCase(register.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(register.fulfilled, (state) => { state.loading = false; state.error = null; })
      .addCase(register.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- LOGIN GOOGLE ---
      .addCase(loginGoogle.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(loginGoogle.fulfilled, handleLoginSuccess)
      .addCase(loginGoogle.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- LOGOUT ---
      .addCase(logout.fulfilled, (state) => {
        state.user  = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;