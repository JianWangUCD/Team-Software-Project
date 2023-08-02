package org.fantasticsix.controller;

import lombok.extern.slf4j.Slf4j;
import org.fantasticsix.domain.Order;
import org.fantasticsix.domain.Product;
import org.fantasticsix.service.ProductService;
import org.fantasticsix.service.impl.ProductServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

import com.amazonaws.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    //search by sellerId
    @GetMapping("/seller/{sellerId}/products")
    public List<Product> getProductBySeller(@PathVariable long sellerId) {

        List<Product> productsBySeller = productService.getProductsBySeller(sellerId);
        return productsBySeller;
    }


    //delete products by sellerId
    @DeleteMapping("/seller/{sellerId}/products")
    public ResponseEntity<Void> deleteProductBySeller(@PathVariable long sellerId) {
        productService.deleteProductsBySeller(sellerId);

        ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
        return responseEntity;
    }


    //search by id
    @GetMapping("/flashsale/products/{id}")
    public Product getProduct(@PathVariable long id) {

        Product product = productService.getProduct(id);
        return product;
    }

    @DeleteMapping("/seller/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {

        productService.deleteProduct(id);

        ResponseEntity<Void> responseEntity = ResponseEntity.noContent().build();
        return responseEntity;
    }

    @PutMapping("/seller/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id,
                                                 @RequestBody Product product) {

        //product.setBrand(brand);

        Product productUpdated = productService.updateProduct(id, product);

        ResponseEntity<Product> responseEntity = new ResponseEntity<Product>(productUpdated, HttpStatus.OK);

        return responseEntity;
    }

    @PutMapping("/flashsale/products/stock/{productId}")
    public ResponseEntity<String> updateProductStock(@PathVariable long productId, @RequestBody Order order) {
        // 根据商品ID查询数据库获取商品信息
        Product product = productService.getProduct(productId);

        // 更新商品信息中的库存数量
        int currentStock = product.getStock();
        if(currentStock - 1 >= 0){
            currentStock--;
            productService.updateProduct(productId, product);
            // 返回更新结果
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient stock for product with ID: " + productId);
        }

    }

    @PostMapping("/seller/products")
    public ResponseEntity<Void> createProduct(@RequestBody Product product){

        Product createdProduct = productService.createProduct(product);

        if (createdProduct == null)
            return ResponseEntity.noContent().build();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdProduct.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }

//    @PostMapping("/seller/products/uploadImage")
//    public ResponseEntity<String> uploadImage(
//            @RequestParam("file") MultipartFile file
//    ) {
//        try {
//            String imgPath = productService.uploadImage(file);
//            return ResponseEntity.ok(imgPath);
//        } catch (IOException e) {
//            log.error("Error while uploading image: {}", e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }




    @Autowired
    ProductServiceImpl awsS3Service;
    @Value("${aws.s3.bucket}")
    private String bucketName;

    @GetMapping("/seller/products/uploadImage")
    public ResponseEntity<String> generatePresignedUrl(@RequestParam String extension) {
        return ResponseEntity.ok(
                awsS3Service.generatePreSignedUrl(UUID.randomUUID()+"."+extension, bucketName, HttpMethod.PUT));
    }
}
