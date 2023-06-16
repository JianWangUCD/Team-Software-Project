package com.fantasticsix.service;

import java.util.List;

import com.fantasticsix.model.Product;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProduct(long id);

    List<Product> getProduct(String brand);

    Product getProduct(String productName, long temp);

    void deleteProduct(long id);

    Product updateProduct(String brand, long id, Product product);

    Product createProduct(String brand, Product product);
}
