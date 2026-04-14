import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchOrders, fetchOrderDetail,
  createOrder, cancelOrder, confirmOrder,
  clearOrderDetail, clearNewOrder, clearError,
} from "../store/orderSlice";

export function useOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, orderDetail, newOrder, loading, error } = useSelector((state) => state.order);

  const handleFetchOrders = () => dispatch(fetchOrders());

  const handleFetchOrderDetail = (orderId) => dispatch(fetchOrderDetail(orderId));

  const handleCreateOrder = async (orderData) => {
    const result = await dispatch(createOrder({
      customerName:    orderData.customerName,
      customerPhone:   orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      method:          orderData.method,
      note:            orderData.note,
    }));
    if (createOrder.fulfilled.match(result)) navigate("/order-success");
  };

  const handleCancelOrder  = (orderId) => dispatch(cancelOrder(orderId));
  const handleConfirmOrder = (orderId) => dispatch(confirmOrder(orderId));

  const handleClearOrderDetail = () => dispatch(clearOrderDetail());
  const handleClearNewOrder    = () => dispatch(clearNewOrder());
  const handleClearError       = () => dispatch(clearError());

  return {
    orders,
    orderDetail,
    newOrder,
    loading,
    error,
    handleFetchOrders,
    handleFetchOrderDetail,
    handleCreateOrder,
    handleCancelOrder,
    handleConfirmOrder,
    handleClearOrderDetail,
    handleClearNewOrder,
    handleClearError,
  };
}