package com.pgmanagement.controller;

import com.pgmanagement.dto.PaymentDTO;
import com.pgmanagement.entity.Rent;
import com.pgmanagement.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rents")
public class RentController {

    private final RentService rentService;

    @Autowired
    public RentController(RentService rentService) {
        this.rentService = rentService;
    }

    @PostMapping
    public ResponseEntity<Rent> createRent(@RequestBody Rent rent) {
        Rent createdRent = rentService.createRent(rent);
        return new ResponseEntity<>(createdRent, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Rent>> getAllRents() {
        return ResponseEntity.ok(rentService.getAllRents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rent> getRentById(@PathVariable Long id) {
        return rentService.getRentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Rent>> getRentsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(rentService.getRentsByUserId(userId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Rent>> getRentsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(rentService.getRentsByStatus(status));
    }

    @PostMapping("/upload-payment")
    public ResponseEntity<Rent> uploadPayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            Rent updatedRent = rentService.uploadPayment(paymentDTO);
            return ResponseEntity.ok(updatedRent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/verify-payment")
    public ResponseEntity<Rent> verifyPayment(@PathVariable Long id, @RequestParam boolean isVerified) {
        try {
            Rent verifiedRent = rentService.verifyPayment(id, isVerified);
            return ResponseEntity.ok(verifiedRent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Rent> updateRentStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Rent updatedRent = rentService.updateRentStatus(id, status);
            return ResponseEntity.ok(updatedRent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
