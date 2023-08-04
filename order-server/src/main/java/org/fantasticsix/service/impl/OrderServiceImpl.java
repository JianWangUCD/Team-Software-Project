package org.fantasticsix.service.impl;

import com.alibaba.fastjson.JSON;
import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.exception.OrderNotFoundException;
import org.fantasticsix.feign.ProductFeignAPI;
import org.fantasticsix.repository.OrderRepository;
import org.fantasticsix.service.OrderService;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

    @Autowired
    private RedissonClient redissonClient;

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
    public List<Order> getOrdersByUserIdAndProductId(Long userId, Long productId) {
        // Implement the method to retrieve orders by userId and productId from orderRepository
        return orderRepository.findByUserIdAndProductId(userId, productId);
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

    // Create a Caffeine cache instance to store product information.
    Cache<Long, Product> productCache = Caffeine.newBuilder()
            .expireAfterWrite(5, TimeUnit.MINUTES) // Cache entry expires after 5 minutes.
            .maximumSize(1000) // Maximum size of the cache.
            .build();
    @Override
    public synchronized Order createOrder(long productId, long userId) {
        // Try to retrieve the product information from the cache.
        Product product = productCache.getIfPresent(productId);
        if (product == null) {
            log.info("Product information not found in cache. Fetching from the product microservice...");
            // Fetch the product information from the microservice if not present in the cache.
            product = productFeignAPI.getProduct(productId);
            if (product != null) {
                // Cache the product information for future use.
                productCache.put(productId, product);
            }
        } else {
            log.info("Product information found in cache. Skipping the fetch from the product microservice.");
        }

        final String lockKey = productId + ":RedissonLock";
        boolean isCreated = false;
        Order order = null;
        RLock rLock = redissonClient.getLock(lockKey);
        try {
            // Acquire the lock before proceeding with the critical section
            rLock.lock();

            List<Order> list = orderRepository.findByUserIdAndProductId(userId, productId);
            if (list.size() >= 1) {
                log.info("You've already snapped up this item.");
            }
            if (product != null && product.getStock() > 0) {
                log.info("============current stock is {}===============", product.getStock());

                product.setStock(product.getStock() - 1);
                productFeignAPI.updateProduct(productId, product);

                //创建订单并保存
                order = new Order();
                order.setUserId(userId);
                order.setProductId(productId);
                order.setAmount(product.getPrice());

                order.setProductName(product.getProductName());
                order.setImg(product.getImg());
                order.setPrice(product.getPrice());
                order.setOrderTime(LocalDateTime.now());

                orderRepository.save(order);
                log.info("Create order successfully, the order information is {}", JSON.toJSONString(order));
                isCreated = true;
            } else {
                log.info("Failed to snap, item sold out.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Release the lock after the critical section is executed
            rLock.unlock();
            if (isCreated)
                return order;
        }

        return null;
    }


    //已弃用
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
