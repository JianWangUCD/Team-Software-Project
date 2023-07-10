package org.fantasticsix.controller;

import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/flashsale/checkout/{userId}")
    public Order createOrder(long productId, @PathVariable(value = "userId") long userId) {
        return orderService.createOrder(productId, userId);
    }
}
