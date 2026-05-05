package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Tenant;
import com.pgmanagement.entity.Bed;
import com.pgmanagement.service.AllocationService;
import com.pgmanagement.service.TenantService;
import com.pgmanagement.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AllocationServiceImpl implements AllocationService {
    
    @Autowired
    private TenantService tenantService;
    
    @Autowired
    private BedService bedService;

    @Override
    public Tenant allocateTenantToBed(Long tenantId, Long bedId) {
        Optional<Tenant> tenantOpt = tenantService.getTenantById(tenantId);
        Optional<Bed> bedOpt = bedService.getBedById(bedId);
        
        if (tenantOpt.isPresent() && bedOpt.isPresent()) {
            Bed bed = bedOpt.get();
            
            // Check if bed is available
            if (bed.getOccupied()) {
                throw new RuntimeException("Bed is already occupied");
            }
            
            Tenant tenant = tenantOpt.get();
            
            // Assign bed to tenant
            tenant.setBedId(bedId);
            tenant.setStatus("ACTIVE");
            tenant.setUpdatedAt(LocalDateTime.now());
            
            // Mark bed as occupied
            bed.setOccupied(true);
            bed.setUpdatedAt(LocalDateTime.now());
            
            // Save changes
            bedService.updateBed(bedId, bed);
            return tenantService.updateTenant(tenantId, tenant);
        }
        
        throw new RuntimeException("Tenant or Bed not found");
    }

    @Override
    public void deallocateTenantFromBed(Long tenantId) {
        Optional<Tenant> tenantOpt = tenantService.getTenantById(tenantId);
        
        if (tenantOpt.isPresent()) {
            Tenant tenant = tenantOpt.get();
            Long bedId = tenant.getBedId();
            
            if (bedId != null) {
                Optional<Bed> bedOpt = bedService.getBedById(bedId);
                if (bedOpt.isPresent()) {
                    Bed bed = bedOpt.get();
                    bed.setOccupied(false);
                    bed.setUpdatedAt(LocalDateTime.now());
                    bedService.updateBed(bedId, bed);
                }
            }
            
            // Update tenant status
            tenant.setBedId(null);
            tenant.setStatus("INACTIVE");
            tenant.setUpdatedAt(LocalDateTime.now());
            tenantService.updateTenant(tenantId, tenant);
        }
    }

    @Override
    public Boolean isBeAvailable(Long bedId) {
        Optional<Bed> bedOpt = bedService.getBedById(bedId);
        if (bedOpt.isPresent()) {
            return !bedOpt.get().getOccupied();
        }
        return false;
    }
}
