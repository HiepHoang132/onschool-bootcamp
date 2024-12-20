package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Product;

public interface IProductRepository extends JpaRepository<Product, Integer> {
	boolean existsByProductCode(String productCode);
}
