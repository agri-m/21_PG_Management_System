package com.pgmanagement.service;

import com.pgmanagement.entity.Room;
import java.util.List;
import java.util.Optional;

public interface RoomService {
    Room createRoom(Room room);
    Optional<Room> getRoomById(Long id);
    Optional<Room> getRoomByNumber(String roomNumber);
    List<Room> getAllRooms();
    List<Room> getRoomsByOwnerId(Long ownerId);
    Room updateRoom(Long id, Room room);
    void deleteRoom(Long id);
}
