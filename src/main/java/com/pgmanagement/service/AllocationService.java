package com.pgmanagement.service;

import com.pgmanagement.entity.Tenant;

public interface AllocationService {
    Tenant allocateTenantToBed(Long tenantId, Long bedId);
    void deallocateTenantFromBed(Long tenantId);
    Boolean isBeAvailable(Long bedId);
}
