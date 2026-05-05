package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Tenant;
import com.pgmanagement.repository.TenantRepository;
import com.pgmanagement.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

@Service
public class TenantServiceImpl implements TenantService {
    
    @Autowired
    private TenantRepository tenantRepository;

    @Override
    public Tenant createTenant(Tenant tenant) {
        tenant.setCreatedAt(LocalDateTime.now());
        tenant.setUpdatedAt(LocalDateTime.now());
        return tenantRepository.save(tenant);
    }

    @Override
    public Optional<Tenant> getTenantById(Long id) {
        return tenantRepository.findById(id);
    }

    @Override
    public Optional<Tenant> getTenantByUserId(Long userId) {
        return tenantRepository.findByUserId(userId);
    }

    @Override
    public Optional<Tenant> getTenantByBedId(Long bedId) {
        return tenantRepository.findByBedId(bedId);
    }

    @Override
    public List<Tenant> getAllTenants() {
        return StreamSupport.stream(tenantRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public List<Tenant> getTenantsByStatus(String status) {
        return tenantRepository.findByStatus(status);
    }

    @Override
    public Tenant updateTenant(Long id, Tenant tenant) {
        Optional<Tenant> existingTenant = tenantRepository.findById(id);
        if (existingTenant.isPresent()) {
            Tenant tenantToUpdate = existingTenant.get();
            tenantToUpdate.setUserId(tenant.getUserId());
            tenantToUpdate.setBedId(tenant.getBedId());
            tenantToUpdate.setCheckInDate(tenant.getCheckInDate());
            tenantToUpdate.setCheckOutDate(tenant.getCheckOutDate());
            tenantToUpdate.setStatus(tenant.getStatus());
            tenantToUpdate.setUpdatedAt(LocalDateTime.now());
            return tenantRepository.save(tenantToUpdate);
        }
        return null;
    }

    @Override
    public void deleteTenant(Long id) {
        tenantRepository.deleteById(id);
    }
}
