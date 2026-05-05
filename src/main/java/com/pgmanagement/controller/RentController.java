package com.pgmanagement.controller;

import com.pgmanagement.dto.PaymentUploadRequest;
import com.pgmanagement.dto.RentCreateRequest;
import com.pgmanagement.dto.RentResponse;
import com.pgmanagement.enums.RentStatus;
import com.pgmanagement.service.RentService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rents")
public class RentController {

    private static final Logger log = LoggerFactory.getLogger(RentController.class);
    private final RentService rentService;

    @Autowired
    public RentController(RentService rentService) {
        this.rentService = rentService;
    }

    @PostMapping
    public ResponseEntity<RentResponse> createRent(@Valid @RequestBody RentCreateRequest request) {
        log.info("REST request to create Rent for user: {}", request.getUserId());
        RentResponse createdRent = rentService.createRent(request);
        return new ResponseEntity<>(createdRent, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<RentResponse>> getAllRents(Pageable pageable) {
        log.info("REST request to get all Rents");
        return ResponseEntity.ok(rentService.getAllRents(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RentResponse> getRentById(@PathVariable Long id) {
        log.info("REST request to get Rent : {}", id);
        return ResponseEntity.ok(rentService.getRentById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<RentResponse>> getRentsByUserId(@PathVariable Long userId, Pageable pageable) {
        log.info("REST request to get Rents for user : {}", userId);
        return ResponseEntity.ok(rentService.getRentsByUserId(userId, pageable));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<RentResponse>> getRentsByStatus(@PathVariable RentStatus status, Pageable pageable) {
        log.info("REST request to get Rents by status : {}", status);
        return ResponseEntity.ok(rentService.getRentsByStatus(status, pageable));
    }

    @PostMapping("/upload-payment")
    public ResponseEntity<RentResponse> uploadPayment(@Valid @RequestBody PaymentUploadRequest request) {
        log.info("REST request to upload payment for rent : {}", request.getRentId());
        RentResponse updatedRent = rentService.uploadPayment(request);
        return ResponseEntity.ok(updatedRent);
    }

    @PostMapping("/{id}/verify-payment")
    public ResponseEntity<RentResponse> verifyPayment(@PathVariable Long id, @RequestParam boolean isVerified) {
        log.info("REST request to verify payment for rent: {}", id);
        RentResponse verifiedRent = rentService.verifyPayment(id, isVerified);
        return ResponseEntity.ok(verifiedRent);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<RentResponse> updateRentStatus(@PathVariable Long id, @RequestParam RentStatus status) {
        log.info("REST request to update rent status to: {}", status);
        RentResponse updatedRent = rentService.updateRentStatus(id, status);
        return ResponseEntity.ok(updatedRent);
    }
}
