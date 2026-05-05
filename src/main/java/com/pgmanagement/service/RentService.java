package com.pgmanagement.service;

import com.pgmanagement.dto.PaymentUploadRequest;
import com.pgmanagement.dto.RentCreateRequest;
import com.pgmanagement.dto.RentResponse;
import com.pgmanagement.entity.Rent;
import com.pgmanagement.enums.RentStatus;
import com.pgmanagement.exception.InvalidPaymentException;
import com.pgmanagement.exception.RentNotFoundException;
import com.pgmanagement.mapper.RentMapper;
import com.pgmanagement.repository.RentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RentService {

    private static final Logger log = LoggerFactory.getLogger(RentService.class);
    private final RentRepository rentRepository;
    private final RentMapper rentMapper;
    private final RentAuditService auditService;

    @Autowired
    public RentService(RentRepository rentRepository, RentMapper rentMapper, RentAuditService auditService) {
        this.rentRepository = rentRepository;
        this.rentMapper = rentMapper;
        this.auditService = auditService;
    }

    public RentResponse createRent(RentCreateRequest request) {
        log.info("Creating new rent record for user {}", request.getUserId());
        Rent rent = rentMapper.toEntity(request);
        rent.setStatus(RentStatus.PENDING);
        Rent savedRent = rentRepository.save(rent);
        
        auditService.logStatusChange(savedRent.getId(), null, RentStatus.PENDING, "SYSTEM");
        return rentMapper.toResponse(savedRent);
    }

    public RentResponse getRentById(Long id) {
        return rentMapper.toResponse(findRentOrThrow(id));
    }

    public Page<RentResponse> getAllRents(Pageable pageable) {
        return rentRepository.findAll(pageable).map(rentMapper::toResponse);
    }

    public Page<RentResponse> getRentsByUserId(Long userId, Pageable pageable) {
        return rentRepository.findByUserId(userId, pageable).map(rentMapper::toResponse);
    }

    public RentResponse uploadPayment(PaymentUploadRequest request) {
        log.info("Uploading payment for rent ID: {}", request.getRentId());
        Rent rent = findRentOrThrow(request.getRentId());
        
        if (rent.getStatus() == RentStatus.PAID) {
            throw new InvalidPaymentException("Rent is already paid.");
        }
        
        RentStatus oldStatus = rent.getStatus();
        rent.setPaymentDate(request.getPaymentDate());
        rent.setStatus(RentStatus.PAYMENT_UPLOADED);
        
        Rent updatedRent = rentRepository.save(rent);
        auditService.logStatusChange(updatedRent.getId(), oldStatus, RentStatus.PAYMENT_UPLOADED, "USER");
        
        return rentMapper.toResponse(updatedRent);
    }

    public RentResponse verifyPayment(Long rentId, boolean isVerified) {
        log.info("Verifying payment for rent ID: {}. isVerified={}", rentId, isVerified);
        Rent rent = findRentOrThrow(rentId);
        
        if (rent.getStatus() != RentStatus.PAYMENT_UPLOADED) {
            throw new InvalidPaymentException("Payment must be uploaded before verification.");
        }
        
        RentStatus oldStatus = rent.getStatus();
        RentStatus newStatus = isVerified ? RentStatus.PAID : RentStatus.PAYMENT_REJECTED;
        
        if (!isVerified) {
            rent.setPaymentDate(null);
        }
        rent.setStatus(newStatus);
        
        Rent updatedRent = rentRepository.save(rent);
        auditService.logStatusChange(updatedRent.getId(), oldStatus, newStatus, "ADMIN");
        
        return rentMapper.toResponse(updatedRent);
    }

    public Page<RentResponse> getRentsByStatus(RentStatus status, Pageable pageable) {
        return rentRepository.findByStatus(status, pageable).map(rentMapper::toResponse);
    }

    public RentResponse updateRentStatus(Long rentId, RentStatus newStatus) {
        log.info("Updating rent ID: {} to status: {}", rentId, newStatus);
        Rent rent = findRentOrThrow(rentId);
        
        RentStatus oldStatus = rent.getStatus();
        rent.setStatus(newStatus);
        
        Rent updatedRent = rentRepository.save(rent);
        auditService.logStatusChange(updatedRent.getId(), oldStatus, newStatus, "SYSTEM");
        
        return rentMapper.toResponse(updatedRent);
    }

    private Rent findRentOrThrow(Long rentId) {
        return rentRepository.findById(rentId)
                .orElseThrow(() -> new RentNotFoundException("Rent record not found for id: " + rentId));
    }
}
