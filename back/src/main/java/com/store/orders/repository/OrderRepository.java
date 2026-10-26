package com.store.orders.repository;

import com.store.orders.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

    @Query("{ '$or': [ " +
           "  { 'productCode': { '$regex': ?0, '$options': 'i' } }, " +
           "  { 'customer.firstName': { '$regex': ?0, '$options': 'i' } }, " +
           "  { 'customer.firstLastName': { '$regex': ?0, '$options': 'i' } }, " +
           "  { 'customer.email': { '$regex': ?0, '$options': 'i' } } " +
           "] }")
    List<Order> searchByKeyword(String keyword);
}