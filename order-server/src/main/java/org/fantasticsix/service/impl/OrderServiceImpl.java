package org.fantasticsix.service.impl;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.repository.OrderRepository;
import org.fantasticsix.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public Order createOrder(long productId, long userId) {
        log.info("接收到{}号商品的下单请求,接下来调用商品微服务查询此商品信息",
                productId);
        //远程调用商品微服务,查询商品信息
        String url = "http://localhost:8081/api/flashsale/products/" + productId;
        Product product = restTemplate.getForObject(url, Product.class);
        log.info("查询到{}号商品的信息,内容是:{}", productId,
                JSON.toJSONString(product));
        //创建订单并保存
        Order order = new Order();
        order.setUserId(userId);
        order.setProductId(productId);
        order.setAmount(product.getPrice());
        orderRepository.save(order);
        log.info("创建订单成功,订单信息为{}", JSON.toJSONString(order));
        return order;
    }
}
