package com.pgmanagement.service;

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

}
