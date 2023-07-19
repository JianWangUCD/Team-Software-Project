package org.fantasticsix.controller;

import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
//@CrossOrigin("http://localhost:3000")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/flashsale/products")
    public List<Product> getAllProducts() {

        List<Product> products = productService.getAllProducts();

        return products;
    }

    //search by sellerId
    @GetMapping("/flashsale/seller/{sellerId}/products")
    public List<Product> getProductBySeller(@PathVariable long sellerId) {

        List<Product> productsBySeller = productService.getProductsBySeller(sellerId);
        return productsBySeller;
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

    @PutMapping("/flashsale/products/stock/{productId}")
    public ResponseEntity<Void> updateProductStock(@PathVariable long productId, @RequestBody Order order) {
        // 根据商品ID查询数据库获取商品信息
        Product product = productService.getProduct(productId);

        // 更新商品信息中的库存数量
        int currentStock = product.getStock();
        if(currentStock - 1 >= 0)
            currentStock--;
        product.setStock(currentStock);
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

//    @PostMapping("/flashsale/products/uploadImage")
//    public void uploadImage(@RequestParam("productId") Long productId, @RequestParam("file") MultipartFile file) {
//        try {
//            productService.uploadImage(productId, file);
//        } catch (IOException e) {
//            // 处理上传失败的情况
//            log.error("error: {}", e.getMessage());
//            throw new RuntimeException("error");
//        }
//    }

    @PostMapping("/flashsale/products/uploadImage")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("productId") Long productId
    ) {
        try {
            String imgPath = productService.uploadImage(productId, file);
            return ResponseEntity.ok(imgPath);
        } catch (IOException e) {
            log.error("Error while uploading image: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}
