package com.pgmanagement.repository;

import com.pgmanagement.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentRepository extends JpaRepository<Rent, Long> {
    List<Rent> findByUserId(Long userId);
    List<Rent> findByRoomId(Long roomId);
    List<Rent> findByStatus(String status);
}
