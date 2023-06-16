package com.fantasticsix.service.impl;

import com.fantasticsix.exception.ProductNotFoundException;
import com.fantasticsix.model.Product;
import com.fantasticsix.repository.ProductRepository;
import com.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

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
    public List<Product> getProduct(String brand) {
        return productRepository.findProductByBrand(brand);
    }

    @Override
    public Product getProduct(String productName, long temp) {
        return productRepository.findProductByProductName(productName);
    }

    @Override
    public void deleteProduct(long id) {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()) {
            productRepository.deleteById(id);
        } else {
            throw new ProductNotFoundException(id);
        }
    }

    @Override
    public Product updateProduct(String brand, long id, Product product) {
        Product productUpdated = productRepository.save(product);
        return productUpdated;
    }

    @Override
    public Product createProduct(String brand, Product product) {
        Product createdProduct = productRepository.save(product);
        return createdProduct;
    }
}
