package com.pgmanagement.repository;

import com.pgmanagement.entity.Bed;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BedRepository extends CrudRepository<Bed, Long> {
    Optional<Bed> findByBedNumberAndRoomId(String bedNumber, Long roomId);
    List<Bed> findByRoomId(Long roomId);
    List<Bed> findByRoomIdAndOccupied(Long roomId, Boolean occupied);
    Integer countByRoomIdAndOccupied(Long roomId, Boolean occupied);
}
