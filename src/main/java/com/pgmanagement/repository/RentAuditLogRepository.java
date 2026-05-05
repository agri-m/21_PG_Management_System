package com.pgmanagement.repository;

import com.pgmanagement.entity.RentAuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentAuditLogRepository extends MongoRepository<RentAuditLog, Long> {
    List<RentAuditLog> findByRentIdOrderByChangedAtDesc(Long rentId);
}
