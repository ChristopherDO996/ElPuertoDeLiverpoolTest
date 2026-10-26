import React, { useState } from 'react';

const INITIAL_FORM_STATE = {
    customer: {
        firstName: '',
        firstLastName: '',
        secondLastName: '',
        email: ''
    },
    shippingAddress: '',
    productCode: '',
    quantity: 1,
    price: 0,
    status: 'pending'
};

const CreateOrderModal = ({ show, onClose, onCreateOrder }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [loading, setLoading] = useState(false);

    if (!show) return null;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onCreateOrder({
                ...formData,
                quantity: parseInt(formData.quantity, 10),
                price: parseFloat(formData.price)
            });
            setFormData(INITIAL_FORM_STATE);
            onClose();
        } catch (err) {
            alert("Failed to create order. Please check all fields.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal show d-block tab-index-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content shadow-lg border-0">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title fw-bold"><i className="bi bi-plus-circle me-2"></i>Create New Order</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body p-4">
                            <h6 className="fw-bold text-muted text-uppercase mb-3">Customer Information</h6>
                            <div className="row g-3 mb-3">
                                <div className="col-md-4">
                                    <label className="form-label">First Name *</label>
                                    <input type="text" name="firstName" className="form-control" required value={formData.customer.firstName} onChange={handleCustomerChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">First Last Name *</label>
                                    <input type="text" name="firstLastName" className="form-control" required value={formData.customer.firstLastName} onChange={handleCustomerChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Second Last Name</label>
                                    <input type="text" name="secondLastName" className="form-control" value={formData.customer.secondLastName} onChange={handleCustomerChange} />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Email Address *</label>
                                    <input type="email" name="email" className="form-control" required value={formData.customer.email} onChange={handleCustomerChange} />
                                </div>
                            </div>

                            <h6 className="fw-bold text-muted text-uppercase mb-3 mt-4">Order & Shipping Details</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Shipping Address *</label>
                                    <input type="text" name="shippingAddress" className="form-control" required value={formData.shippingAddress} onChange={handleFieldChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Product Code *</label>
                                    <input type="text" name="productCode" className="form-control" placeholder="e.g. 12345" required value={formData.productCode} onChange={handleFieldChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Quantity *</label>
                                    <input type="number" name="quantity" min="1" className="form-control" required value={formData.quantity} onChange={handleFieldChange} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label">Price (USD) *</label>
                                    <input type="number" step="0.01" min="0" name="price" className="form-control" required value={formData.price} onChange={handleFieldChange} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light">
                            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
                            <button type="submit" className="btn btn-danger px-4" disabled={loading}>
                                {loading ? 'Creating...' : 'Save Order'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOrderModal;