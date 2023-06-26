package com.fantasticsix.service.impl;

import com.fantasticsix.exception.OrderNotFoundException;
import com.fantasticsix.model.Order;
import com.fantasticsix.repository.OrderRepository;
import com.fantasticsix.repository.UserRepository;
import com.fantasticsix.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Order> getAllOrders() {
        logger.trace("Entered getAllOrders method");

        List<Order> orders = orderRepository.findAll();

        return orders;
    }

    @Override
    public Order getOrder(long id) {
        return orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(id));
    }

    @Override
    public void deleteOrder(long id) {
        Optional<Order> order = orderRepository.findById(id);
        if(order.isPresent()) {
            orderRepository.deleteById(id);
        } else {
            throw new OrderNotFoundException(id);
        }
    }

    @Override
    public Order updateOrder(long id, Order order) {
        Order orderUpdated = orderRepository.save(order);
        return orderUpdated;
    }

    @Override
    public Order createOrder(Order orderRequest, long userId) {

        Order order = userRepository.findById(userId).map(user -> {
            orderRequest.setUser(user);
            return orderRepository.save(orderRequest);

        }).orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + userId));


        return order;

//        Order createdOrder = orderRepository.save(order);
//        return createdOrder;
    }
}
