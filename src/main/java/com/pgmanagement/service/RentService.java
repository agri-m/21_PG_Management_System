package com.pgmanagement.service;

import com.pgmanagement.dto.PaymentUploadRequest;
import com.pgmanagement.entity.Rent;
import com.pgmanagement.enums.RentStatus;
import com.pgmanagement.exception.RentNotFoundException;
import com.pgmanagement.repository.RentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class handling the core business logic for rent management,
 * including tracking, payment uploads, and verifications.
 */
@Service
public class RentService {

    private static final Logger log = LoggerFactory.getLogger(RentService.class);
    private final RentRepository rentRepository;

    @Autowired
    public RentService(RentRepository rentRepository) {
        this.rentRepository = rentRepository;
    }

    public Rent createRent(Rent rent) {
        log.info("Creating new rent record for user {}", rent.getUserId());
        if (rent.getStatus() == null) {
            rent.setStatus(RentStatus.PENDING);
        }
        return rentRepository.save(rent);
    }

    public Rent getRentById(Long id) {
        return findRentOrThrow(id);
    }

    public List<Rent> getAllRents() {
        return rentRepository.findAll();
    }

    public List<Rent> getRentsByUserId(Long userId) {
        return rentRepository.findByUserId(userId);
    }

    public Rent uploadPayment(PaymentUploadRequest request) {
        log.info("Uploading payment for rent ID: {}", request.getRentId());
        Rent rent = findRentOrThrow(request.getRentId());
        
        rent.setPaymentDate(request.getPaymentDate());
        rent.setStatus(RentStatus.PAYMENT_UPLOADED);
        
        return rentRepository.save(rent);
    }

    public Rent verifyPayment(Long rentId, boolean isVerified) {
        log.info("Verifying payment for rent ID: {}. isVerified={}", rentId, isVerified);
        Rent rent = findRentOrThrow(rentId);
        
        if (isVerified) {
            rent.setStatus(RentStatus.PAID);
        } else {
            rent.setStatus(RentStatus.PAYMENT_REJECTED);
            rent.setPaymentDate(null);
        }
        return rentRepository.save(rent);
    }

    public List<Rent> getRentsByStatus(RentStatus status) {
        return rentRepository.findByStatus(status);
    }

    public Rent updateRentStatus(Long rentId, RentStatus newStatus) {
        log.info("Updating rent ID: {} to status: {}", rentId, newStatus);
        Rent rent = findRentOrThrow(rentId);
        rent.setStatus(newStatus);
        return rentRepository.save(rent);
    }

    private Rent findRentOrThrow(Long rentId) {
        return rentRepository.findById(rentId)
                .orElseThrow(() -> new RentNotFoundException("Rent record not found for id: " + rentId));
    }
}
