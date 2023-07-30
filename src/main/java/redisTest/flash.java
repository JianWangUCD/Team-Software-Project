package redisTest;

import org.redisson.Redisson;
import org.redisson.api.RLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
public class flash {

    @Autowired
    private Redisson redisson;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @RequestMapping("/deduct_stock")
    @Override
    public Order createOrder(long productId, long userId) {
//        log.info("Received an order request for product {}, then calling the product microservice to query this product information",
//                productId);

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

        // Product product = productFeignAPI.getProduct(productId);
//        log.info("The information of the product {} is found, the content is: {}", productId,
//                JSON.toJSONString(product));

        final String lockKey = productId + ":RedissonLock";
        boolean isCreated = false;
        Order order = null;
        RLock rLock = redissonClient.getLock(lockKey);
        try {
            if (rLock.tryLock(5, 100, TimeUnit.MILLISECONDS)) {
                List<Order> list = orderRepository.findByUserIdAndProductId(userId, productId);
                if (list.size() >= 1) {
                    log.info("You've already snapped up this item.");
                }
                if (product != null && product.getStock() > 0) {
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
                    product.setStock(product.getStock() - 1);
                    productFeignAPI.updateProduct(productId, product);
                    log.info("Create order successfully, the order information is {}", JSON.toJSONString(order));
                    isCreated = true;
                } else {
                    log.info("Failed to snap, item sold out.");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rLock.isLocked()) {
                if (rLock.isHeldByCurrentThread()) {
                    rLock.unlock();
                }
            }
            if (isCreated)
                return order;
        }

        return null;
    }

}
}


