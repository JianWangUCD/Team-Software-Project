package org.fantasticsix.service.impl;

import com.alibaba.fastjson.JSON;
import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.feign.ProductFeignAPI;
import org.fantasticsix.repository.OrderRepository;
import org.fantasticsix.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
    public Order createOrder(long productId, long userId) {
        log.info("Received an order request for product {}, then calling the product microservice to query this product information",
                productId);
//        //从nacos中获取服务地址
//        ServiceInstance instance = discoveryClient.
//                getInstances("product-service").get(0);
////        String url = instance.getHost()+":"+instance.getPort();
//        //远程调用商品微服务,查询商品信息
//        String url = "http://" + instance.getHost()+":"+instance.getPort()+"/api/flashsale/products/" + productId;
//        Product product = restTemplate.getForObject(url, Product.class);
//        Product product = restTemplate.getForObject("http://"+url+"api/flashsale/products/"+productId, Product.class);
//        log.info("地址（）", url);
        Product product = productFeignAPI.getProduct(productId);
        log.info("The information of the product {} is found, the content is: {}", productId,
                JSON.toJSONString(product));
        //创建订单并保存
        Order order = new Order();
        order.setUserId(userId);
        order.setProductId(productId);
        order.setAmount(product.getPrice());
        orderRepository.save(order);
        log.info("Create order successfully, the order information is {}", JSON.toJSONString(order));

        // stock-1
        updateProductStock(productId, order);

        return order;
    }

    public void updateProductStock(long productId, Order order) {
//        String url = "http://localhost:8081/api/flashsale/products/" + productId;
//
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // 构建请求体
//        HttpEntity<Order> requestEntity = new HttpEntity<>(order, headers);

        // 发送PUT请求
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
