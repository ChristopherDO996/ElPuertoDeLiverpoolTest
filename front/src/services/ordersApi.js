import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '/api';

export const fetchOrders = async (query = '') => {
    const url = query ? `${API_BASE}/orders?search=${encodeURIComponent(query)}` : `${API_BASE}/orders`;
    const response = await axios.get(url);
    return response.data;
};

export const fetchOrderById = async (id) => {
    const response = await axios.get(`${API_BASE}/orders/${id}`);
    return response.data;
};

export const createOrder = async (orderData) => {
    const response = await axios.post(`${API_BASE}/orders`, orderData);
    return response.data;
};

export const updateOrder = async (id, orderData) => {
    const response = await axios.put(`${API_BASE}/orders/${id}`, orderData);
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await axios.patch(`${API_BASE}/orders/${id}/status`, { status });
    return response.data;
};

export const deleteOrder = async (id) => {
    await axios.delete(`${API_BASE}/orders/${id}`);
};