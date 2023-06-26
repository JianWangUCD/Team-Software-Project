package com.fantasticsix.service;

import java.util.List;

import com.fantasticsix.model.Order;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrder(long id);

    void deleteOrder(long id);

    Order updateOrder(long id, Order order);

    Order createOrder(Order orderRequest, long userId);
}
