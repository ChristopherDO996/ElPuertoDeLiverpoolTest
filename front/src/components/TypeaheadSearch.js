import React, { useState, useEffect } from 'react';

const TypeaheadSearch = ({ orders, onSelectOrder, onSearchChange }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (query.trim().length > 0) {
            const term = query.toLowerCase();
            const filtered = orders.filter(item =>
                item.productCode.toLowerCase().includes(term) ||
                item.customer.firstName.toLowerCase().includes(term) ||
                item.customer.firstLastName.toLowerCase().includes(term) ||
                item.customer.email.toLowerCase().includes(term)
            );
            setSuggestions(filtered);
            setShowDropdown(true);
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    }, [query, orders]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        onSearchChange(val);
    };

    const handleSelect = (item) => {
        setQuery(`${item.productCode} - ${item.customer.firstName} ${item.customer.firstLastName}`);
        setShowDropdown(false);
        onSelectOrder(item);
    };

    return (
        <div className="position-relative w-100 mb-3">
            <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search by customer, email, or product code..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => query && setShowDropdown(true)}
                />
                {query && (
                    <button className="btn btn-outline-secondary" type="button" onClick={() => { setQuery(''); onSearchChange(''); }}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                )}
            </div>

            {showDropdown && (
                <div className="card position-absolute w-100 shadow-lg mt-1 z-3">
                    <ul className="list-group list-group-flush">
                        {suggestions.length > 0 ? (
                            suggestions.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleSelect(item)}
                                >
                                    <div>
                                        <strong>{item.productCode}</strong> - {item.customer.firstName} {item.customer.firstLastName}
                                        <br />
                                        <small className="text-muted">{item.customer.email}</small>
                                    </div>
                                    <span className={`badge ${getStatusBadgeClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item text-muted text-center py-3">
                                <i className="bi bi-exclamation-circle me-2"></i>
                                No results match your search criteria.
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'pending': return 'bg-warning text-dark';
        case 'in progress': return 'bg-info text-dark';
        case 'shipped': return 'bg-primary';
        case 'delivered': return 'bg-success';
        default: return 'bg-secondary';
    }
};

export default TypeaheadSearch;