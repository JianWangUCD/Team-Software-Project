package org.fantasticsix.service;


import org.fantasticsix.domain.Order;

public interface OrderService {
    Order createOrder(long productId, long userId);
}