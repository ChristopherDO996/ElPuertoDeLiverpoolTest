package com.store.orders.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    @Valid
    @NotNull(message = "Customer details are required")
    private CustomerData customer;

    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;

    @NotBlank(message = "Product code is required")
    private String productCode;

    @Min(value = 1, message = "Minimum quantity is 1")
    private int quantity;

    @Min(value = 0, message = "Price must be a positive number")
    private double price;

    @NotNull(message = "Order status is required")
    private OrderStatus status;

    private Date createdAt = new Date();
}