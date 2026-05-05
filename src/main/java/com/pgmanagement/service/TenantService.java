package com.pgmanagement.service;

import com.pgmanagement.entity.Tenant;
import java.util.List;
import java.util.Optional;

public interface TenantService {
    Tenant createTenant(Tenant tenant);
    Optional<Tenant> getTenantById(Long id);
    Optional<Tenant> getTenantByUserId(Long userId);
    Optional<Tenant> getTenantByBedId(Long bedId);
    List<Tenant> getAllTenants();
    List<Tenant> getTenantsByStatus(String status);
    Tenant updateTenant(Long id, Tenant tenant);
    void deleteTenant(Long id);
}
