package org.fantasticsix.service;

import org.fantasticsix.domain.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProduct(long id);

    void deleteProduct(long id);

    Product updateProduct(long id, Product product);

    Product createProduct(Product productRequest);

    //Set<Product> addProductsToOrder(long orderId, Set<Product> productRequestList);
    //Product addProductsToOrder(long orderId, Product productRequest);

}
