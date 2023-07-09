package org.fantasticsix.service;

import org.fantasticsix.domain.Product;

public interface ProductService {

    Product getProduct(long id);

    Product updateProduct(long id, Product product);

}
