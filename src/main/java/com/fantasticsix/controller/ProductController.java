package com.fantasticsix.controller;

import java.net.URI;
import java.util.List;

import com.fantasticsix.model.Product;
import com.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
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

//    //search by product name
//    @GetMapping("/flashsale/product/{productName}/{anyNumber}")
//    public Product getProduct(@PathVariable String productName, @PathVariable Long anyNumber) {
//
//        Product product = productService.getProduct(productName, anyNumber);
//        return product;
//    }

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

//    @PostMapping("/flashsale/products")
//    public ResponseEntity<Void> createProduct(@RequestBody Product product) {
//
//        long sellerId = product.getSeller().getId();
//
//        Product createdProduct = productService.createProduct(product, sellerId);
//
//        if (createdProduct == null)
//            return ResponseEntity.noContent().build();
//
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdProduct.getId())
//                .toUri();
//
//        return ResponseEntity.created(uri).build();
//    }
    @PostMapping("/flashsale/products/{sellerId}")
    public ResponseEntity<Void> createProduct(@RequestBody Product product, @PathVariable(value = "sellerId") long sellerId){

        Product createdProduct = productService.createProduct(product, sellerId);

        if (createdProduct == null)
            return ResponseEntity.noContent().build();

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdProduct.getId())
                .toUri();

        return ResponseEntity.created(uri).build();
    }
}
