package com.example.eshop.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("" +
            "SELECT p FROM Product p " +
            "WHERE p.category = ?1"
    )
    List<Product> findByCategory(String category);
}
