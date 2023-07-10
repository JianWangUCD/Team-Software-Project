package org.fantasticsix.service.impl;

import org.fantasticsix.domain.Product;
import org.fantasticsix.exception.ProductNotFoundException;
import org.fantasticsix.repository.ProductRepository;
import org.fantasticsix.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product getProduct(long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }
}
