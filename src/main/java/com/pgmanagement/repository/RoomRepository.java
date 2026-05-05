package com.pgmanagement.repository;

import com.pgmanagement.entity.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends CrudRepository<Room, Long> {
    Optional<Room> findByRoomNumber(String roomNumber);
    List<Room> findByOwnerId(Long ownerId);
    List<Room> findByFloor(Integer floor);
}
