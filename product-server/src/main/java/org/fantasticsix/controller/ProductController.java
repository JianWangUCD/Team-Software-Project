package org.fantasticsix.controller;

import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/flashsale/products")
    public List<Product> getAllProducts() {

        List<Product> products = productService.getAllProducts();

        return products;
    }

    //search by id
    @GetMapping("/flashsale/products/{id}")
    public Product getProduct(@PathVariable long id) {

        Product product = productService.getProduct(id);
        return product;
    }

    @DeleteMapping("/flashsale/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {

        productService.deleteProduct(id);

        ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
        return responseEntity;
    }

    @PutMapping("/flashsale/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id,
                                                 @RequestBody Product product) {

        //product.setBrand(brand);

        Product productUpdated = productService.updateProduct(id, product);

        ResponseEntity<Product> responseEntity = new ResponseEntity<Product>(productUpdated, HttpStatus.OK);

        return responseEntity;
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

    @PostMapping("/flashsale/products")
    public ResponseEntity<Void> createProduct(@RequestBody Product product){

        Product createdProduct = productService.createProduct(product);

        if (createdProduct == null)
            return ResponseEntity.noContent().build();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdProduct.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }
}
