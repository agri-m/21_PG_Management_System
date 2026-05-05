package com.pgmanagement.controller;

import com.pgmanagement.entity.Tenant;
import com.pgmanagement.service.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tenants")
public class TenantController {
    
    @Autowired
    private TenantService tenantService;
    
    @PostMapping
    public ResponseEntity<Tenant> createTenant(@RequestBody Tenant tenant) {
        Tenant createdTenant = tenantService.createTenant(tenant);
        return ResponseEntity.ok(createdTenant);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Tenant>> getTenantById(@PathVariable Long id) {
        return ResponseEntity.ok(tenantService.getTenantById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<Tenant>> getAllTenants() {
        return ResponseEntity.ok(tenantService.getAllTenants());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<Tenant>> getTenantByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(tenantService.getTenantByUserId(userId));
    }
    
    @GetMapping("/bed/{bedId}")
    public ResponseEntity<Optional<Tenant>> getTenantByBedId(@PathVariable Long bedId) {
        return ResponseEntity.ok(tenantService.getTenantByBedId(bedId));
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Tenant>> getTenantsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(tenantService.getTenantsByStatus(status));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tenant> updateTenant(@PathVariable Long id, @RequestBody Tenant tenant) {
        Tenant updatedTenant = tenantService.updateTenant(id, tenant);
        return ResponseEntity.ok(updatedTenant);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenant(@PathVariable Long id) {
        tenantService.deleteTenant(id);
        return ResponseEntity.ok().build();
    }
}
