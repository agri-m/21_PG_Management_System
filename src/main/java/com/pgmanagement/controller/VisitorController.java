package com.pgmanagement.controller;

import com.pgmanagement.entity.Visitor;
import com.pgmanagement.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;

    @Autowired
    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @PostMapping
    public ResponseEntity<Visitor> addVisitor(@RequestBody Visitor visitor) {
        return ResponseEntity.ok(visitorService.addVisitor(visitor));
    }

    @GetMapping
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        return ResponseEntity.ok(visitorService.getAllVisitors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visitor> getVisitorById(@PathVariable Long id) {
        return ResponseEntity.ok(visitorService.getVisitorById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Visitor> updateVisitorStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(visitorService.updateVisitorStatus(id, status));
    }
}
