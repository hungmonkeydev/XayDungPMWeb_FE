import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrdersAPI, getOrderDetailAPI,
  createOrderAPI, cancelOrderAPI, confirmOrderAPI,
} from "../services/orderService";

// ---- ASYNC ACTIONS ----
export const fetchOrders = createAsyncThunk("order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try { return await getOrdersAPI(); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const fetchOrderDetail = createAsyncThunk("order/fetchOrderDetail",
  async (orderId, { rejectWithValue }) => {
    try { return await getOrderDetailAPI(orderId); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const createOrder = createAsyncThunk("order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try { return await createOrderAPI(orderData); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const cancelOrder = createAsyncThunk("order/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try { await cancelOrderAPI(orderId); return orderId; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

export const confirmOrder = createAsyncThunk("order/confirmOrder",
  async (orderId, { rejectWithValue }) => {
    try { await confirmOrderAPI(orderId); return orderId; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

// ---- SLICE ----
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders:      [],
    orderDetail: null,
    newOrder:    null,
    loading:     false,
    error:       null,
  },
  reducers: {
    clearOrderDetail(state) { state.orderDetail = null; },
    clearNewOrder(state)    { state.newOrder = null; },
    clearError(state)       { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // --- FETCH ORDERS ---
      .addCase(fetchOrders.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchOrders.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- FETCH ORDER DETAIL ---
      .addCase(fetchOrderDetail.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => { state.loading = false; state.orderDetail = action.payload; })
      .addCase(fetchOrderDetail.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- CREATE ORDER ---
      .addCase(createOrder.pending,   (state) => { state.loading = true;  state.error = null; })
      .addCase(createOrder.fulfilled, (state, action) => { state.loading = false; state.newOrder = action.payload; })
      .addCase(createOrder.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- CANCEL ORDER ---
      .addCase(cancelOrder.pending,   (state) => { state.loading = true; })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders  = state.orders.map((o) =>
          o.id === action.payload ? { ...o, status: "cancelled" } : o
        );
      })
      .addCase(cancelOrder.rejected,  (state, action) => { state.loading = false; state.error = action.payload; })

      // --- CONFIRM ORDER ---
      .addCase(confirmOrder.pending,   (state) => { state.loading = true; })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders  = state.orders.map((o) =>
          o.id === action.payload ? { ...o, status: "completed" } : o
        );
      })
      .addCase(confirmOrder.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearOrderDetail, clearNewOrder, clearError } = orderSlice.actions;
export default orderSlice.reducer;