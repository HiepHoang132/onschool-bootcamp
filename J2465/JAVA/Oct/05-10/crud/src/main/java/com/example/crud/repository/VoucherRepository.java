package com.example.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crud.model.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
}
