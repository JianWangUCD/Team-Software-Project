package com.fantasticsix.repository;

import com.fantasticsix.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findProductByProductName(String productName);
    List<Product> findProductByBrand(String brand);
}
