package com.pgmanagement.controller;

import com.pgmanagement.entity.Bed;
import com.pgmanagement.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/beds")
public class BedController {
    
    @Autowired
    private BedService bedService;
    
    @PostMapping
    public ResponseEntity<Bed> createBed(@RequestBody Bed bed) {
        Bed createdBed = bedService.createBed(bed);
        return ResponseEntity.ok(createdBed);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Bed>> getBedById(@PathVariable Long id) {
        return ResponseEntity.ok(bedService.getBedById(id));
    }
    
    @GetMapping("/room/{roomId}")
    public ResponseEntity<List<Bed>> getBedsByRoomId(@PathVariable Long roomId) {
        return ResponseEntity.ok(bedService.getBedsByRoomId(roomId));
    }
    
    @GetMapping("/room/{roomId}/available")
    public ResponseEntity<List<Bed>> getAvailableBedsByRoomId(@PathVariable Long roomId) {
        return ResponseEntity.ok(bedService.getAvailableBedsByRoomId(roomId));
    }
    
    @GetMapping("/room/{roomId}/available-count")
    public ResponseEntity<Integer> getAvailableBedCountByRoomId(@PathVariable Long roomId) {
        return ResponseEntity.ok(bedService.getAvailableBedCountByRoomId(roomId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Bed> updateBed(@PathVariable Long id, @RequestBody Bed bed) {
        Bed updatedBed = bedService.updateBed(id, bed);
        return ResponseEntity.ok(updatedBed);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBed(@PathVariable Long id) {
        bedService.deleteBed(id);
        return ResponseEntity.ok().build();
    }
}
