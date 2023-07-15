package redisTest;

import org.redisson.Redisson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class flash {

    @Autowired
    private Redisson redisson;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @RequestMapping("/deduct_stock")
    public String deductStock() {
        String LockKey = "LockKey";
        Boolean result = stringRedisTemplate.opsForValue().setIfAbsent(LockKey, "111");
        if (!result) {
            return "error";
        }
            int stock = Integer.parseInt(stringRedisTemplate.opsForValue().get("stock"));
            if (stock > 0) {
                int realStock = stock - 1;
                stringRedisTemplate.opsForValue().set("stock", realStock + "");
                System.out.println(realStock);
            } else {
                System.out.println("failed");
            }
            stringRedisTemplate.delete(LockKey);
            return "end";
        }

    }


