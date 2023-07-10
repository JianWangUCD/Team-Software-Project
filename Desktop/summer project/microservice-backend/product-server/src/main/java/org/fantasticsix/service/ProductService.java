package org.fantasticsix.service;

import org.fantasticsix.domain.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProduct(long id);

    Product updateProduct(long id, Product product);

}
