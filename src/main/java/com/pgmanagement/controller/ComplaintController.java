package com.pgmanagement.controller;

import com.pgmanagement.dto.ComplaintRequestDto;
import com.pgmanagement.dto.ComplaintResponseDto;
import com.pgmanagement.entity.Complaint;
import com.pgmanagement.service.ComplaintService;
import com.pgmanagement.util.DtoMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;
    private final DtoMapper dtoMapper;

    @Autowired
    public ComplaintController(ComplaintService complaintService, DtoMapper dtoMapper) {
        this.complaintService = complaintService;
        this.dtoMapper = dtoMapper;
    }

    @PostMapping
    public ResponseEntity<ComplaintResponseDto> registerComplaint(@Valid @RequestBody ComplaintRequestDto complaintDto) {
        Complaint complaint = dtoMapper.toEntity(complaintDto);
        Complaint savedComplaint = complaintService.registerComplaint(complaint);
        return new ResponseEntity<>(dtoMapper.toDto(savedComplaint), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {
        List<ComplaintResponseDto> complaints = complaintService.getAllComplaints().stream()
                .map(dtoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(complaints);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponseDto> getComplaintById(@PathVariable Long id) {
        Complaint complaint = complaintService.getComplaintById(id);
        return ResponseEntity.ok(dtoMapper.toDto(complaint));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ComplaintResponseDto> updateComplaintStatus(@PathVariable Long id, @RequestParam String status) {
        Complaint updatedComplaint = complaintService.updateComplaintStatus(id, status);
        return ResponseEntity.ok(dtoMapper.toDto(updatedComplaint));
    }
}
