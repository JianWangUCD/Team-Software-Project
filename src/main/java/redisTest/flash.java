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
        String LockKey = "LockKey";
        //String ClientID = UUID.randomUUID().toString(); //Thread ID
        RLock rLock = redisson.getLock(LockKey);
        try {
            //Boolean result = stringRedisTemplate.opsForValue().setIfAbsent(LockKey, "111");
            //stringRedisTemplate.expire(LockKey, 30, TimeUnit.SECONDS);
            //Boolean result = stringRedisTemplate.opsForValue().setIfAbsent(LockKey, ClientID, 10, TimeUnit.SECONDS);

            //if (!result) {
            //    return "error";
            //}
            rLock.lock(); //
            int stock = Integer.parseInt(stringRedisTemplate.opsForValue().get("stock"));
            if (stock > 0) {
                int realStock = stock - 1;
                stringRedisTemplate.opsForValue().set("stock", realStock + "");
                System.out.println(realStock);
            } else {
                System.out.println("failed");
            }
        }finally {
            rLock.unlock();
            //if(ClientID.equals(stringRedisTemplate.opsForValue().get(LockKey))){
            //   stringRedisTemplate.delete(LockKey);
            //}
        }
        return "end";
        }

    }


