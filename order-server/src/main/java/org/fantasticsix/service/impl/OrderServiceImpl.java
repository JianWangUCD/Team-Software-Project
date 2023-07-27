package org.fantasticsix.service.impl;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.exception.OrderNotFoundException;
import org.fantasticsix.feign.ProductFeignAPI;
import org.fantasticsix.repository.OrderRepository;
import org.fantasticsix.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
//    @Autowired
//    private RestTemplate restTemplate;

    @Autowired
    private ProductFeignAPI productFeignAPI;
//    @Autowired
//    private DiscoveryClient discoveryClient;

    @Override
    public List<Order> getAllOrders() {

        List<Order> orders = orderRepository.findAll();

        return orders;
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
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
    public Boolean stockCheck(long productId) {
        Product product = productFeignAPI.getProduct(productId);
        return product.getStock() > 0;
    }


    @Override
    public Order createOrder(long productId, long userId) {
        log.info("Received an order request for product {}, then calling the product microservice to query this product information",
                productId);
//        //远程调用商品微服务,查询商品信息
//        String url = "http://localhost:8081/api/flashsale/products/" + productId;
//        Product product = restTemplate.getForObject(url, Product.class);
        Product product = productFeignAPI.getProduct(productId);
        log.info("The information of the product {} is found, the content is: {}", productId,
                JSON.toJSONString(product));

            //创建订单并保存
            Order order = new Order();
            order.setUserId(userId);
            order.setProductId(productId);
            order.setAmount(product.getPrice());

            order.setProductName(product.getProductName());
            order.setImg(product.getImg());
            order.setPrice(product.getPrice());
            order.setOrderTime(LocalDateTime.now());

            orderRepository.save(order);
            log.info("Create order successfully, the order information is {}", JSON.toJSONString(order));

            // stock-1
            updateProductStock(productId, order);
            return order;




    }

    public void updateProductStock(long productId, Order order) {
//        String url = "http://localhost:8081/api/flashsale/products/stock/" + productId;
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // 构建请求体
//        HttpEntity<Order> requestEntity = new HttpEntity<>(order, headers);
//
//        // 发送PUT请求
//        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Void.class);
        ResponseEntity<Void> response = productFeignAPI.updateProductStock(productId, order);
        if (response.getStatusCode() == HttpStatus.OK) {
            // 库存更新成功
            log.info("Stock changed successfully");
        } else {
            // 库存更新失败
            log.info("Stock changed unsuccessfully");
        }
    }
}
