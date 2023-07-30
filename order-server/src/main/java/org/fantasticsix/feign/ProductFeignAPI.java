package org.fantasticsix.feign;

import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "product-service")
public interface ProductFeignAPI {
    @GetMapping("/flashsale/products/{id}")
    Product getProduct(@PathVariable long id);

    @PutMapping("/flashsale/products/stock/{productId}")
    ResponseEntity<Void> updateProductStock(@PathVariable long productId, @RequestBody Order order);

    @PutMapping("/seller/products/{id}")
    ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product product);
}

