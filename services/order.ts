import { API } from "./api";

export const getOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

export const getOrderById = async (id: string) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (order: any) => {
  const res = await API.post("/orders", order);
  return res.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await API.put(`/orders/${id}`, { status });
  return res.data;
};
