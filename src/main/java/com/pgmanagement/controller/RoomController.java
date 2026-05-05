package com.pgmanagement.controller;

import com.pgmanagement.entity.Room;
import com.pgmanagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    
    @Autowired
    private RoomService roomService;
    
    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createdRoom);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Room>> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }
    
    @GetMapping("/number/{roomNumber}")
    public ResponseEntity<Optional<Room>> getRoomByNumber(@PathVariable String roomNumber) {
        return ResponseEntity.ok(roomService.getRoomByNumber(roomNumber));
    }
    
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Room>> getRoomsByOwnerId(@PathVariable Long ownerId) {
        return ResponseEntity.ok(roomService.getRoomsByOwnerId(ownerId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        Room updatedRoom = roomService.updateRoom(id, room);
        return ResponseEntity.ok(updatedRoom);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok().build();
    }
}
