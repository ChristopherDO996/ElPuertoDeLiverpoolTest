import React, { useState, useEffect } from 'react';
import { fetchOrders, fetchOrderById, createOrder, updateOrder, deleteOrder } from './services/ordersApi';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import TypeaheadSearch from './components/TypeaheadSearch';
import CreateOrderModal from './components/CreateOrderModal';
import DashboardMetrics from './components/DashboardMetrics';

function App() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const loadOrderList = async (query = '') => {
        try {
            const data = await fetchOrders(query);
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrderList();
    }, []);

    const handleBackToList = () => {
        setSelectedOrder(null);
        loadOrderList('');
    };

    const handleCreateOrder = async (orderData) => {
        await createOrder(orderData);
        await loadOrderList();
    };

    const handleUpdateOrder = async (id, updatedData) => {
        const updated = await updateOrder(id, updatedData);
        if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder(updated);
        }
        await loadOrderList();
    };

    const handleDeleteOrder = async (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            await deleteOrder(id);
            if (selectedOrder && selectedOrder.id === id) {
                setSelectedOrder(null);
            }
            await loadOrderList();
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column">
            <header className="navbar navbar-dark bg-liverpool shadow-sm py-3 mb-4">
                <div className="container-fluid px-4">
                    <span className="navbar-brand fw-bold fs-4 d-flex align-items-center">
                        El Puerto de Liverpool
                    </span>
                    <span className="badge bg-white text-liverpool px-3 py-2 fw-bold rounded-pill">
                        Sales & Orders Dashboard
                    </span>
                </div>
            </header>

            <main className="container-fluid px-4 flex-grow-1">
                {selectedOrder ? (
                    <OrderDetail
                        order={selectedOrder}
                        onBack={handleBackToList}
                        onUpdateOrder={handleUpdateOrder}
                        onDeleteOrder={handleDeleteOrder}
                    />
                ) : (
                    <div>
                        <DashboardMetrics orders={orders} />

                        <div className="card border-0 shadow-sm p-3 mb-4 rounded-3">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-2">
                                <div>
                                    <h4 className="fw-bold text-dark m-0">Order Management</h4>
                                    <small className="text-muted">Search, edit, and update store orders in real-time</small>
                                </div>
                                <button className="btn btn-liverpool rounded-pill px-4 py-2 fw-semibold" onClick={() => setShowCreateModal(true)}>
                                    <i className="bi bi-plus-lg me-2"></i>New Order
                                </button>
                            </div>

                            <TypeaheadSearch
                                orders={orders}
                                onSelectOrder={(item) => setSelectedOrder(item)}
                                onSearchChange={(text) => loadOrderList(text)}
                            />
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-liverpool" role="status"></div>
                                <p className="mt-2 text-muted">Loading orders dashboard...</p>
                            </div>
                        ) : (
                            <OrderList
                                orders={orders}
                                onViewDetail={(id) => fetchOrderById(id).then(setSelectedOrder)}
                                onDeleteOrder={handleDeleteOrder}
                                onInlineUpdate={handleUpdateOrder}
                            />
                        )}
                    </div>
                )}
            </main>

            <CreateOrderModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreateOrder={handleCreateOrder}
            />
        </div>
    );
}

export default App;