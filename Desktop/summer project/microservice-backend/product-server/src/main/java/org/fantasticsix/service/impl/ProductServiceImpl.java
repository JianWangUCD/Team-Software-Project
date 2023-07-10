package org.fantasticsix.service.impl;

import org.fantasticsix.domain.Product;
import org.fantasticsix.exception.ProductNotFoundException;
import org.fantasticsix.repository.ProductRepository;
import org.fantasticsix.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        logger.trace("Entered getAllProducts method");

        List<Product> products = productRepository.findAll();

        return products;
    }

    @Override
    public Product getProduct(long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @Override
    public Product updateProduct(long id, Product product) {
        Product productUpdated = productRepository.save(product);
        return productUpdated;
    }
}
