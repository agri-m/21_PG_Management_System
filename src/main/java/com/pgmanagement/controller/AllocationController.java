package com.pgmanagement.controller;

import com.pgmanagement.entity.Tenant;
import com.pgmanagement.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/allocations")
public class AllocationController {
    
    @Autowired
    private AllocationService allocationService;
    
    @PostMapping("/assign")
    public ResponseEntity<Tenant> allocateTenantToBed(@RequestParam Long tenantId, @RequestParam Long bedId) {
        Tenant allocatedTenant = allocationService.allocateTenantToBed(tenantId, bedId);
        return ResponseEntity.ok(allocatedTenant);
    }
    
    @PostMapping("/deassign")
    public ResponseEntity<Void> deallocateTenantFromBed(@RequestParam Long tenantId) {
        allocationService.deallocateTenantFromBed(tenantId);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/bed/{bedId}/available")
    public ResponseEntity<Boolean> isBeAvailable(@PathVariable Long bedId) {
        Boolean available = allocationService.isBeAvailable(bedId);
        return ResponseEntity.ok(available);
    }
}
