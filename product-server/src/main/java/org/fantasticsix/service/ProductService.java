package org.fantasticsix.service;

import org.fantasticsix.domain.Product;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();

    List<Product> getProductsBySeller(Long sellerId);

    Product getProduct(long id);

    void deleteProduct(long id);

    Product updateProduct(long id, Product product);

    Product createProduct(Product productRequest);

    String uploadImage(MultipartFile file) throws IOException;

    void deleteProductsBySeller(Long sellerId);

}
