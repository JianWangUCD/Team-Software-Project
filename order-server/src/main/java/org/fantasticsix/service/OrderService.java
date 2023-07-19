package org.fantasticsix.service;

import org.fantasticsix.domain.Order;

import java.util.List;

public interface OrderService {


    List<Order> getAllOrders();


    List<Order> getOrdersByUserId(Long userId);

    Order getOrder(long id);

    void deleteOrder(long id);

    Order updateOrder(long id, Order order);

    Boolean stockCheck(long productId);

    Order createOrder(long productId, long userId);
}