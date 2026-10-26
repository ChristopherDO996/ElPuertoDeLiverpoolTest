import React, { useState } from 'react';

const STATUS_OPTIONS = ["pending", "in progress", "shipped", "delivered"];

const OrderDetail = ({ order, onBack, onUpdateOrder, onDeleteOrder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...order });
    const [isSaving, setIsSaving] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            customer: { ...prev.customer, [name]: value }
        }));
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        await onUpdateOrder(order.id, {
            ...formData,
            quantity: parseInt(formData.quantity, 10),
            price: parseFloat(formData.price)
        });
        setIsSaving(false);
        setIsEditing(false);
    };

    return (
        <div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-link text-decoration-none p-0" onClick={onBack}>
                    <i className="bi bi-arrow-left me-1"></i> Back to Orders List
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onDeleteOrder(order.id)}>
                    <i className="bi bi-trash me-1"></i> Delete Order
                </button>
            </div>

            <div className="card shadow border-0">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                    <h4 className="m-0 fw-bold text-primary">Order Detail #{order.id.substring(order.id.length - 6)}</h4>
                    <div>
                        {!isEditing ? (
                            <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)}>
                                <i className="bi bi-pencil me-1"></i> Edit Order
                            </button>
                        ) : (
                            <button className="btn btn-success btn-sm me-2" onClick={handleSave} disabled={isSaving}>
                                <i className="bi bi-check-circle me-1"></i> {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="card-body p-4">
                    <div className="row g-4">

                        <div className="col-12 col-md-6">
                            <div className="p-3 bg-light rounded h-100">
                                <h6 className="text-uppercase text-muted fw-bold mb-3"><i className="bi bi-person me-2"></i>Customer Information</h6>
                                {isEditing ? (
                                    <>
                                        <div className="mb-2">
                                            <label className="form-label small mb-1">First Name</label>
                                            <input type="text" name="firstName" className="form-control form-control-sm" value={formData.customer.firstName} onChange={handleCustomerChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label small mb-1">First Last Name</label>
                                            <input type="text" name="firstLastName" className="form-control form-control-sm" value={formData.customer.firstLastName} onChange={handleCustomerChange} />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label small mb-1">Email</label>
                                            <input type="email" name="email" className="form-control form-control-sm" value={formData.customer.email} onChange={handleCustomerChange} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-1"><strong>Full Name:</strong> {order.customer.firstName} {order.customer.firstLastName} {order.customer.secondLastName}</p>
                                        <p className="mb-0"><strong>Email Address:</strong> {order.customer.email}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="p-3 bg-light rounded h-100">
                                <h6 className="text-uppercase text-muted fw-bold mb-3"><i className="bi bi-geo-alt me-2"></i>Delivery Information</h6>
                                {isEditing ? (
                                    <div>
                                        <label className="form-label small mb-1">Shipping Address</label>
                                        <textarea name="shippingAddress" className="form-control form-control-sm" rows="3" value={formData.shippingAddress} onChange={handleFieldChange}></textarea>
                                    </div>
                                ) : (
                                    <p className="mb-0"><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                                )}
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="p-3 border rounded">
                                <h6 className="text-uppercase text-muted fw-bold mb-3"><i className="bi bi-box-seam me-2"></i>Purchase Summary</h6>
                                <div className="row text-center text-md-start">
                                    <div className="col-md-3">
                                        <span className="text-muted d-block">Product Code</span>
                                        <span className="fw-bold fs-5">{order.productCode}</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span className="text-muted d-block">Quantity</span>
                                        <span className="fw-bold fs-5">{order.quantity}</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span className="text-muted d-block">Unit Price</span>
                                        <span className="fw-bold fs-5">{formatCurrency(order.price)}</span>
                                    </div>
                                    <div className="col-md-3">
                                        <span className="text-muted d-block">Total Price</span>
                                        <span className="fw-bold fs-5 text-success">{formatCurrency(order.price * order.quantity)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="p-3 bg-white border border-warning rounded d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="m-0 fw-bold">Order Status</h6>
                                    <small className="text-muted">Current status in system</small>
                                </div>
                                <select
                                    className="form-select w-auto text-capitalize"
                                    value={formData.status}
                                    onChange={(e) => {
                                        handleFieldChange(e);
                                        if (!isEditing) onUpdateOrder(order.id, { ...order, status: e.target.value });
                                    }}
                                >
                                    {STATUS_OPTIONS.map(st => (
                                        <option key={st} value={st}>{st}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;