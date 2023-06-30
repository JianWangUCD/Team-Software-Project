package com.fantasticsix.service.impl;

import com.fantasticsix.exception.ProductNotFoundException;
import com.fantasticsix.model.Order;
import com.fantasticsix.model.Product;
import com.fantasticsix.repository.OrderRepository;
import com.fantasticsix.repository.ProductRepository;
import com.fantasticsix.repository.SellerRepository;
import com.fantasticsix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private OrderRepository orderRepository;

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

//    @Override
//    public Product getProduct(String productName, long temp) {
//        return productRepository.findProductByProductName(productName);
//    }

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
    public Product updateProduct(long id, Product product) {
        Product productUpdated = productRepository.save(product);
        return productUpdated;
    }

    @Override
    public Product createProduct(Product productRequest, long sellerId) {

        Product product = sellerRepository.findById(sellerId).map(seller -> {
            productRequest.setSeller(seller);
            return productRepository.save(productRequest);

        }).orElseThrow(() -> new ResourceNotFoundException("Not found Seller with id = " + sellerId));


        return product;

//        Product createdProduct = productRepository.save(product);
//        return createdProduct;
    }

//    @Override
//    public Set<Product> addProductsToOrder(long orderId, Set<Product> productRequestList){
//        Set<Product> products = new HashSet<>();
//        for(Product productRequest: productRequestList){
//            Product product = orderRepository.findById(orderId).map(order -> {
//                Long productId = productRequest.getId();
//
//                // product is existed
//                if(productId != null){
//                    Product _product = productRepository.findById(productId)
//                            .orElseThrow(() -> new ResourceNotFoundException("Not found Product with id = " + productId));
//                    order.addProduct(_product);
//                    orderRepository.save(order);
//                    return _product;
//                }
//
//                // add and create new product
//                order.addProduct(productRequest);
//                return productRepository.save(productRequest);
//            }).orElseThrow(() -> new ResourceNotFoundException("Not found Order with id = " + orderId));
//
//            products.add(product);
//        }
//        return products;
//    }

    @Override
    public Product addProductsToOrder(long orderId, Product productRequest) {
        Product product = orderRepository.findById(orderId).map(order -> {
            Long productId = productRequest.getId();

            // product is existed
            if(productId != null){
                Product _product = productRepository.findById(productId)
                        .orElseThrow(() -> new ResourceNotFoundException("Not found Product with id = " + productId));
                order.addProduct(_product);
                orderRepository.save(order);
                return _product;
            }

            // add and create new product
            order.addProduct(productRequest);
            return productRepository.save(productRequest);
        }).orElseThrow(() -> new ResourceNotFoundException("Not found Order with id = " + orderId));

        return product;
    }

}
