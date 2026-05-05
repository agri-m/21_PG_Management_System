package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Complaint;
import com.pgmanagement.entity.ComplaintStatus;
import com.pgmanagement.repository.ComplaintRepository;
import com.pgmanagement.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ComplaintServiceImpl(ComplaintRepository complaintRepository, SimpMessagingTemplate messagingTemplate) {
        this.complaintRepository = complaintRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public Complaint registerComplaint(Complaint complaint) {
        complaint.setStatus(ComplaintStatus.OPEN);
        Complaint savedComplaint = complaintRepository.save(complaint);
        
        // Send real-time notification to admins/staff
        messagingTemplate.convertAndSend("/topic/complaints", "New complaint registered: " + savedComplaint.getTitle());
        
        return savedComplaint;
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found with id: " + id));
    }

    @Override
    public Complaint updateComplaintStatus(Long id, String status) {
        Complaint complaint = getComplaintById(id);
        
        try {
            ComplaintStatus newStatus = ComplaintStatus.valueOf(status.toUpperCase());
            complaint.setStatus(newStatus);
            
            if (newStatus == ComplaintStatus.RESOLVED) {
                complaint.setResolvedAt(LocalDateTime.now());
            }
            
            Complaint updatedComplaint = complaintRepository.save(complaint);
            
            // Notify user about status update
            messagingTemplate.convertAndSend("/topic/complaints/" + id, "Complaint status updated to: " + newStatus);
            
            return updatedComplaint;
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status);
        }
    }
}
