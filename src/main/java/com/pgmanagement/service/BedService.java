package com.pgmanagement.service;

import com.pgmanagement.entity.Bed;
import java.util.List;
import java.util.Optional;

public interface BedService {
    Bed createBed(Bed bed);
    Optional<Bed> getBedById(Long id);
    List<Bed> getBedsByRoomId(Long roomId);
    List<Bed> getAvailableBedsByRoomId(Long roomId);
    Bed updateBed(Long id, Bed bed);
    void deleteBed(Long id);
    Integer getAvailableBedCountByRoomId(Long roomId);
}
