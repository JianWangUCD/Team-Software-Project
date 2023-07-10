package org.fantasticsix.service;

import org.fantasticsix.domain.Order;

import java.util.List;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrder(long id);

    void deleteOrder(long id);

    Order updateOrder(long id, Order order);

    Order createOrder(long productId, long userId);
}