package com.store.orders.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OrderStatus {
    PENDING("pending"),
    IN_PROGRESS("in progress"),
    SHIPPED("shipped"),
    DELIVERED("delivered");

    private final String value;

    OrderStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static OrderStatus fromText(String text) {
        if (text == null) return null;
        for (OrderStatus status : OrderStatus.values()) {
            if (status.value.equalsIgnoreCase(text.trim()) || status.name().equalsIgnoreCase(text.trim())) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid order status: " + text);
    }
}