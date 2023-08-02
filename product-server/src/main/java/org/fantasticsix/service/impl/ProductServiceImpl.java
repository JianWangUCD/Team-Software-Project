package org.fantasticsix.service.impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.fantasticsix.domain.Product;
import org.fantasticsix.exception.ProductNotFoundException;
import org.fantasticsix.repository.ProductRepository;
import org.fantasticsix.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

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
        String imgPath = "/home/ec2-user/images/" + fileName;


        return imgPath;
    }




    @Autowired
    private  AmazonS3 amazonS3;


    public String generatePreSignedUrl(String filePath,
                                       String bucketName,
                                       HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 10); //validity of 10 minutes
        return amazonS3.generatePresignedUrl(bucketName, filePath, calendar.getTime(), httpMethod).toString();
    }
}
