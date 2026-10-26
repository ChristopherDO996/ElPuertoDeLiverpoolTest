import React, { useState } from 'react';

const STATUS_OPTIONS = ["pending", "in progress", "shipped", "delivered"];

const OrderList = ({ orders, onViewDetail, onDeleteOrder, onInlineUpdate }) => {
    const [editingQty, setEditingQty] = useState({});

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handleQtyChange = (orderId, value) => {
        setEditingQty(prev => ({ ...prev, [orderId]: value }));
    };

    const handleQtyBlur = (order) => {
        const newQty = parseInt(editingQty[order.id], 10);
        if (!isNaN(newQty) && newQty > 0 && newQty !== order.quantity) {
            onInlineUpdate(order.id, { ...order, quantity: newQty });
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Code</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th style={{ width: '110px' }} className="text-center">Qty (Editable)</th>
                                <th>Total</th>
                                <th style={{ width: '160px' }}>Status</th>
                                <th className="text-end" style={{ width: '160px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((o) => (
                                    <tr key={o.id}>
                                        <td><span className="fw-bold text-secondary">{o.productCode}</span></td>
                                        <td>{o.customer.firstName} {o.customer.firstLastName}</td>
                                        <td className="text-muted">{o.customer.email}</td>

                                        <td className="text-center">
                                            <input
                                                type="number"
                                                min="1"
                                                className="form-control form-control-sm text-center fw-bold border-1"
                                                value={editingQty[o.id] !== undefined ? editingQty[o.id] : o.quantity}
                                                onChange={(e) => handleQtyChange(o.id, e.target.value)}
                                                onBlur={() => handleQtyBlur(o)}
                                                title="Click to edit quantity, blur to save"
                                            />
                                        </td>

                                        <td className="fw-semibold">{formatCurrency(o.price * o.quantity)}</td>

                                        <td>
                                            <select
                                                className="form-select form-select-sm text-capitalize border-0 bg-light fw-semibold"
                                                value={o.status}
                                                onChange={(e) => onInlineUpdate(o.id, { ...o, status: e.target.value })}
                                            >
                                                {STATUS_OPTIONS.map(st => (
                                                    <option key={st} value={st}>{st}</option>
                                                ))}
                                            </select>
                                        </td>

                                        <td className="text-end">
                                            <div className="btn-group btn-group-sm">
                                                <button
                                                    className="btn btn-outline-primary rounded-pill me-1 px-3"
                                                    onClick={() => onViewDetail(o.id)}
                                                    title="View Details"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger rounded-pill px-3"
                                                    onClick={() => onDeleteOrder(o.id)}
                                                    title="Delete Order"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-muted">
                                        No orders available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderList;