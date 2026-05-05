package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Bed;
import com.pgmanagement.repository.BedRepository;
import com.pgmanagement.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

@Service
public class BedServiceImpl implements BedService {
    
    @Autowired
    private BedRepository bedRepository;

    @Override
    public Bed createBed(Bed bed) {
        bed.setCreatedAt(LocalDateTime.now());
        bed.setUpdatedAt(LocalDateTime.now());
        return bedRepository.save(bed);
    }

    @Override
    public Optional<Bed> getBedById(Long id) {
        return bedRepository.findById(id);
    }

    @Override
    public List<Bed> getBedsByRoomId(Long roomId) {
        return bedRepository.findByRoomId(roomId);
    }

    @Override
    public List<Bed> getAvailableBedsByRoomId(Long roomId) {
        return bedRepository.findByRoomIdAndOccupied(roomId, false);
    }

    @Override
    public Bed updateBed(Long id, Bed bed) {
        Optional<Bed> existingBed = bedRepository.findById(id);
        if (existingBed.isPresent()) {
            Bed bedToUpdate = existingBed.get();
            bedToUpdate.setBedNumber(bed.getBedNumber());
            bedToUpdate.setRoomId(bed.getRoomId());
            bedToUpdate.setOccupied(bed.getOccupied());
            bedToUpdate.setUpdatedAt(LocalDateTime.now());
            return bedRepository.save(bedToUpdate);
        }
        return null;
    }

    @Override
    public void deleteBed(Long id) {
        bedRepository.deleteById(id);
    }

    @Override
    public Integer getAvailableBedCountByRoomId(Long roomId) {
        Integer totalBeds = bedRepository.findByRoomId(roomId).size();
        Integer occupiedBeds = bedRepository.countByRoomIdAndOccupied(roomId, true);
        return totalBeds - occupiedBeds;
    }
}
