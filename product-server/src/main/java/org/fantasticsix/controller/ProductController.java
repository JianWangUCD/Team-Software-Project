package org.fantasticsix.controller;

import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    //search by id
    @GetMapping("/flashsale/products/{id}")
    public Product getProduct(@PathVariable long id) {

        Product product = productService.getProduct(id);
        return product;
    }

    @PutMapping("/flashsale/products/{productId}")
    public ResponseEntity<Void> updateProductStock(@PathVariable long productId, @RequestBody Order order) {
        // 根据商品ID查询数据库获取商品信息
        Product product = productService.getProduct(productId);

        // 更新商品信息中的库存数量
        product.setStock(product.getStock() - 1);
        productService.updateProduct(productId, product);

        // 返回更新结果
        return ResponseEntity.ok().build();
    }
}
