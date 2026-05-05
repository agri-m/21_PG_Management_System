package com.pgmanagement.controller;

import com.pgmanagement.dto.PaymentUploadRequest;
import com.pgmanagement.entity.Rent;
import com.pgmanagement.enums.RentStatus;
import com.pgmanagement.service.RentService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<Rent> createRent(@Valid @RequestBody Rent rent) {
        log.info("REST request to create Rent");
        Rent createdRent = rentService.createRent(rent);
        return new ResponseEntity<>(createdRent, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Rent>> getAllRents() {
        return ResponseEntity.ok(rentService.getAllRents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rent> getRentById(@PathVariable Long id) {
        return ResponseEntity.ok(rentService.getRentById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Rent>> getRentsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(rentService.getRentsByUserId(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Rent>> getRentsByStatus(@PathVariable RentStatus status) {
        return ResponseEntity.ok(rentService.getRentsByStatus(status));
    }

    @PostMapping("/upload-payment")
    public ResponseEntity<Rent> uploadPayment(@Valid @RequestBody PaymentUploadRequest request) {
        log.info("REST request to upload payment");
        Rent updatedRent = rentService.uploadPayment(request);
        return ResponseEntity.ok(updatedRent);
    }

    @PostMapping("/{id}/verify-payment")
    public ResponseEntity<Rent> verifyPayment(@PathVariable Long id, @RequestParam boolean isVerified) {
        log.info("REST request to verify payment for rent: {}", id);
        Rent verifiedRent = rentService.verifyPayment(id, isVerified);
        return ResponseEntity.ok(verifiedRent);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Rent> updateRentStatus(@PathVariable Long id, @RequestParam RentStatus status) {
        log.info("REST request to update rent status to: {}", status);
        Rent updatedRent = rentService.updateRentStatus(id, status);
        return ResponseEntity.ok(updatedRent);
    }
}
