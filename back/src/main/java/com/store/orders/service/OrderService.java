package com.store.orders.service;

import com.store.orders.model.Order;
import com.store.orders.model.OrderStatus;
import com.store.orders.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    public List<Order> searchOrders(String query) {
        if (query == null || query.trim().isEmpty()) {
            return orderRepository.findAll();
        }
        return orderRepository.searchByKeyword(query.trim());
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(String id, Order updatedData) {
        return orderRepository.findById(id).map(order -> {
            order.setCustomer(updatedData.getCustomer());
            order.setShippingAddress(updatedData.getShippingAddress());
            order.setProductCode(updatedData.getProductCode());
            order.setQuantity(updatedData.getQuantity());
            order.setPrice(updatedData.getPrice());
            order.setStatus(updatedData.getStatus());
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
    }

    public Order updateStatus(String id, OrderStatus newStatus) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}