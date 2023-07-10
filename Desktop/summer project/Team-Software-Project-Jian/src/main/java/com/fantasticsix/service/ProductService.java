package com.fantasticsix.service;

import java.util.List;

import com.fantasticsix.model.Product;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProduct(long id);

//    Product getProduct(String productName, long temp);

    void deleteProduct(long id);

    Product updateProduct(long id, Product product);

    Product createProduct(Product product);
}