package org.fantasticsix.service.impl;

import org.fantasticsix.domain.Product;
import org.fantasticsix.exception.ProductNotFoundException;
import org.fantasticsix.repository.ProductRepository;
import org.fantasticsix.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;

    @Value("${file.upload-dir}")
    private String uploadDirectory;


    @Override
    public List<Product> getAllProducts() {
        logger.trace("Entered getAllProducts method");

        List<Product> products = productRepository.findAll();

        return products;
    }

    @Override
    public List<Product> getProductsBySeller(Long sellerId){
        List<Product> products = productRepository.findBySellerId(sellerId);

        return products;
    }

    @Override
    public void deleteProductsBySeller(Long sellerId) {
        List<Product> products = productRepository.findBySellerId(sellerId);
        if (!products.isEmpty()) {
            productRepository.deleteAll(products);
        } else {
            throw new RuntimeException("No products found for seller with ID: " + sellerId);
        }
    }




    @Override
    public Product getProduct(long id) {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

//    // that method is for preventing overselling when creating order
//    @Override
//    public Product getProductByIdAndVersion(long productId, int version) {
//        return productRepository.findByIdAndVersion(productId, version);
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
    public Product createProduct(Product productRequest) {
        Product createdProduct = productRepository.save(productRequest);
        return createdProduct;
    }


    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        // Check if the upload directory exists, create it if not
        if (!Files.exists(Paths.get(uploadDirectory))) {
            Files.createDirectories(Paths.get(uploadDirectory));
        }

        // Generate a unique filename for the uploaded image
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        // Save the file to the upload directory on the file system
        Path targetPath = Paths.get(uploadDirectory, fileName);
        Files.copy(file.getInputStream(), targetPath);

        // Return the relative path to the uploaded image
        String imgPath = "/images/" + fileName;


        return imgPath;
    }
}
