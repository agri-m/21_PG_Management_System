package com.pgmanagement.repository;

import com.pgmanagement.entity.Tenant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends CrudRepository<Tenant, Long> {
    Optional<Tenant> findByUserId(Long userId);
    Optional<Tenant> findByBedId(Long bedId);
    List<Tenant> findByStatus(String status);
    List<Tenant> findByUserIdAndStatus(Long userId, String status);
}
