import React from 'react';

const DashboardMetrics = ({ orders }) => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

    const totalRevenue = orders.reduce((sum, o) => sum + (o.price * o.quantity), 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    };

    return (
        <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card metric-card p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-muted small fw-semibold text-uppercase">Total Orders</span>
                            <h3 className="fw-bold m-0 mt-1">{totalOrders}</h3>
                        </div>
                        <div className="metric-icon bg-liverpool text-white">
                            <i className="bi bi-box-seam"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card metric-card p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-muted small fw-semibold text-uppercase">Pending</span>
                            <h3 className="fw-bold m-0 mt-1 text-warning">{pendingOrders}</h3>
                        </div>
                        <div className="metric-icon bg-warning bg-opacity-20 text-warning">
                            <i className="bi bi-clock-history"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card metric-card p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-muted small fw-semibold text-uppercase">Delivered</span>
                            <h3 className="fw-bold m-0 mt-1 text-success">{deliveredOrders}</h3>
                        </div>
                        <div className="metric-icon bg-success bg-opacity-20 text-success">
                            <i className="bi bi-check-circle"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
                <div className="card metric-card p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-muted small fw-semibold text-uppercase">Total Revenue</span>
                            <h3 className="fw-bold m-0 mt-1 text-liverpool">{formatCurrency(totalRevenue)}</h3>
                        </div>
                        <div className="metric-icon bg-liverpool text-white bg-opacity-10 text-liverpool">
                            <i className="bi bi-currency-dollar"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMetrics;