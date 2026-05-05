package com.pgmanagement.controller;

import com.pgmanagement.entity.Complaint;
import com.pgmanagement.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    public ResponseEntity<Complaint> registerComplaint(@RequestBody Complaint complaint) {
        return ResponseEntity.ok(complaintService.registerComplaint(complaint));
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id) {
        return ResponseEntity.ok(complaintService.getComplaintById(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Complaint> updateComplaintStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(complaintService.updateComplaintStatus(id, status));
    }
}
