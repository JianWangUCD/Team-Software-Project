package org.fantasticsix.repository;

import org.fantasticsix.domain.Order;

import org.fantasticsix.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    List<Order> findByUserIdAndProductId(Long userId, Long productId);

}
