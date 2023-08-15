package fantasticsix.service.impl;

import com.alibaba.fastjson.JSON;
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
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {
    private Cache redisCache;
    @Autowired
    public OrderServiceImpl(CacheManager cacheManager) {
        this.redisCache = cacheManager.getCache("productCache");
    }

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
        if (order.isPresent()) {
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


//    // Create a Caffeine cache instance to store product information.
//    Cache<Long, Product> productCache = Caffeine.newBuilder()
//            .expireAfterWrite(5, TimeUnit.MINUTES) // Cache entry expires after 5 minutes.
//            .maximumSize(1000) // Maximum size of the cache.
//            .build();

    @Override
    public Order createOrder(long productId, long userId) {
        // Acquire a distributed lock on the product ID
        final String lockKey = productId + ":RedissonLock";
        RLock rLock = redissonClient.getLock(lockKey);
        try {
            // Wait for the lock for a reasonable amount of time
            if (rLock.tryLock(500, 2000, TimeUnit.MILLISECONDS)) {
                // Check if the user has already snapped up this item
                List<Order> list = orderRepository.findByUserIdAndProductId(userId, productId);
                if (list.size() >= 1) {
                    log.info("You've already snapped up this item.");
                    return null; // Return early if the user has already created an order for this product
                }

                // Fetch product information from Redis or the microservice
                Product product = getProductInformation(productId);
                if (product == null || product.getStock() <= 0) {
                    log.info("Failed to snap, item sold out.");
                    return null; // Return early if the product is not available
                }

                // Create the order and save it
                Order order = new Order();
                order.setUserId(userId);
                order.setProductId(productId);
                order.setAmount(product.getPrice());
                order.setProductName(product.getProductName());
                order.setImg(product.getImg());
                order.setPrice(product.getPrice());
                order.setOrderTime(LocalDateTime.now());

                orderRepository.save(order);

                // Reduce the product stock
                product.setStock(product.getStock() - 1);
                updateProductInformation(productId, product);

                log.info("Create order successfully, the order information is {}", JSON.toJSONString(order));
                return order;
            } else {
                log.info("Failed to acquire the lock, please try again later.");
                return null; // Return early if the lock cannot be acquired
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null on any exception
        } finally {
            // Release the lock when the order creation is completed
            if (rLock.isLocked() && rLock.isHeldByCurrentThread()) {
                rLock.unlock();
            }
        }
    }

    private Product getProductInformation(long productId) {
        // First, try to retrieve the product information from the cache (Redis)
        Product product = (Product) redisCache.get(productId);
        if (product == null) {
            log.info("Product information not found in cache. Fetching from the product microservice...");
            // Fetch the product information from the microservice if not present in the cache.
            product = productFeignAPI.getProduct(productId);
            if (product != null) {
                // Cache the product information for future use.
                redisCache.put(productId, product);
            }
        } else {
            log.info("Product information found in cache. Skipping the fetch from the product microservice.");
        }
        return product;
    }

    private void updateProductInformation(long productId, Product product) {
        // Update the product information in Redis or the microservice
        productFeignAPI.updateProduct(productId, product);
    }
//    public void updateProductStock(long productId, Order order) {
////        String url = "http://localhost:8081/api/flashsale/products/stock/" + productId;
////
////        HttpHeaders headers = new HttpHeaders();
////        headers.setContentType(MediaType.APPLICATION_JSON);
////
////        // 构建请求体
////        HttpEntity<Order> requestEntity = new HttpEntity<>(order, headers);
////
////        // 发送PUT请求
////        ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Void.class);
//        ResponseEntity<Void> response = productFeignAPI.updateProductStock(productId, order);
//        if (response.getStatusCode() == HttpStatus.OK) {
//            // 库存更新成功
//            log.info("Stock changed successfully");
//        } else {
//            // 库存更新失败
//            log.info("Stock changed unsuccessfully");
//        }
//    }
}
