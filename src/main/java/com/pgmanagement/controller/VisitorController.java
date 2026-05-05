package com.pgmanagement.controller;

import com.pgmanagement.dto.VisitorRequestDto;
import com.pgmanagement.dto.VisitorResponseDto;
import com.pgmanagement.entity.Visitor;
import com.pgmanagement.service.VisitorService;
import com.pgmanagement.util.DtoMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;
    private final DtoMapper dtoMapper;

    @Autowired
    public VisitorController(VisitorService visitorService, DtoMapper dtoMapper) {
        this.visitorService = visitorService;
        this.dtoMapper = dtoMapper;
    }

    @PostMapping
    public ResponseEntity<VisitorResponseDto> addVisitor(@Valid @RequestBody VisitorRequestDto visitorDto) {
        Visitor visitor = dtoMapper.toEntity(visitorDto);
        Visitor savedVisitor = visitorService.addVisitor(visitor);
        return new ResponseEntity<>(dtoMapper.toDto(savedVisitor), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<VisitorResponseDto>> getAllVisitors() {
        List<VisitorResponseDto> visitors = visitorService.getAllVisitors().stream()
                .map(dtoMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(visitors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitorResponseDto> getVisitorById(@PathVariable Long id) {
        Visitor visitor = visitorService.getVisitorById(id);
        return ResponseEntity.ok(dtoMapper.toDto(visitor));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<VisitorResponseDto> updateVisitorStatus(@PathVariable Long id, @RequestParam String status) {
        Visitor updatedVisitor = visitorService.updateVisitorStatus(id, status);
        return ResponseEntity.ok(dtoMapper.toDto(updatedVisitor));
    }
}
