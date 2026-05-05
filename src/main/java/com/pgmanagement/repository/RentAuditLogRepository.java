package com.pgmanagement.repository;

import com.pgmanagement.entity.RentAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentAuditLogRepository extends JpaRepository<RentAuditLog, Long> {
    List<RentAuditLog> findByRentIdOrderByChangedAtDesc(Long rentId);
}
