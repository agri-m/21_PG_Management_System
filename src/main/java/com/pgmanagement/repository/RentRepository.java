package com.pgmanagement.repository;

import com.pgmanagement.entity.Rent;
import com.pgmanagement.enums.RentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentRepository extends MongoRepository<Rent, Long> {
    Page<Rent> findByUserId(Long userId, Pageable pageable);
    Page<Rent> findByRoomId(Long roomId, Pageable pageable);
    Page<Rent> findByStatus(RentStatus status, Pageable pageable);
}
