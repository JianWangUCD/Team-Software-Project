package org.fantasticsix.repository;
import org.fantasticsix.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
    List<Product> findBySellerId(Long sellerId);

//    // that method is for preventing overselling when creating order
//    Product findByIdAndVersion(long productId, int version);

}
