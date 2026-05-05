package com.pgmanagement.service;

import com.pgmanagement.dto.PaymentDTO;
import com.pgmanagement.entity.Rent;
import com.pgmanagement.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentService {

    private final RentRepository rentRepository;

    @Autowired
    public RentService(RentRepository rentRepository) {
        this.rentRepository = rentRepository;
    }

    public Rent createRent(Rent rent) {
        return rentRepository.save(rent);
    }

    public Optional<Rent> getRentById(Long id) {
        return rentRepository.findById(id);
    }

    public List<Rent> getAllRents() {
        return rentRepository.findAll();
    }

    public List<Rent> getRentsByUserId(Long userId) {
        return rentRepository.findByUserId(userId);
    }

    public Rent uploadPayment(PaymentDTO paymentDTO) {
        Optional<Rent> rentOpt = rentRepository.findById(paymentDTO.getRentId());
        if (rentOpt.isPresent()) {
            Rent rent = rentOpt.get();
            rent.setPaymentDate(paymentDTO.getPaymentDate());
            rent.setStatus("PAYMENT_UPLOADED"); // Status changes to UPLOADED, awaiting verification
            // Could save transaction reference in Rent entity if property existed, for now just updating status
            return rentRepository.save(rent);
        }
        throw new RuntimeException("Rent record not found for id: " + paymentDTO.getRentId());
    }

    public Rent verifyPayment(Long rentId, boolean isVerified) {
        Optional<Rent> rentOpt = rentRepository.findById(rentId);
        if (rentOpt.isPresent()) {
            Rent rent = rentOpt.get();
            if (isVerified) {
                rent.setStatus("PAID");
            } else {
                rent.setStatus("PAYMENT_REJECTED");
                rent.setPaymentDate(null); // Clear payment date if rejected
            }
            return rentRepository.save(rent);
        }
        throw new RuntimeException("Rent record not found for id: " + rentId);
    }

}
