package redisTest;

import org.redisson.Redisson;
import org.redisson.api.RLock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
public class flash {

    @Autowired
    private Redisson redisson;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @RequestMapping("/deduct_stock")
    public String deductStock() {
        RLock rLock = redissonClient.getLock("id" + productId);
        try {
            if (rLock.tryLock(5, TimeUnit.SECONDS)) {
                Product product = productService.getProduct(productId);
                int currentStock = product.getStock();
                if (currentStock > 0) {
                    product.setStock(currentStock - 1);
                    productService.updateProduct(productId, product);
                }
            }
        } catch (Exception e) {

        } finally {
            rLock.unlock();
        }


        return null;
    }
}


