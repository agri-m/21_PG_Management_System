package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Room;
import com.pgmanagement.repository.RoomRepository;
import com.pgmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public Room createRoom(Room room) {
        room.setCreatedAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public Optional<Room> getRoomByNumber(String roomNumber) {
        return roomRepository.findByRoomNumber(roomNumber);
    }

    @Override
    public List<Room> getAllRooms() {
        return StreamSupport.stream(roomRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public List<Room> getRoomsByOwnerId(Long ownerId) {
        return roomRepository.findByOwnerId(ownerId);
    }

    @Override
    public Room updateRoom(Long id, Room room) {
        Optional<Room> existingRoom = roomRepository.findById(id);
        if (existingRoom.isPresent()) {
            Room roomToUpdate = existingRoom.get();
            roomToUpdate.setRoomNumber(room.getRoomNumber());
            roomToUpdate.setFloor(room.getFloor());
            roomToUpdate.setTotalBeds(room.getTotalBeds());
            roomToUpdate.setOwnerId(room.getOwnerId());
            roomToUpdate.setUpdatedAt(LocalDateTime.now());
            return roomRepository.save(roomToUpdate);
        }
        return null;
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
