package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Complaint;
import com.pgmanagement.entity.ComplaintStatus;
import com.pgmanagement.exception.ResourceNotFoundException;
import com.pgmanagement.exception.InvalidOperationException;
import com.pgmanagement.repository.ComplaintRepository;
import com.pgmanagement.service.ComplaintService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private static final Logger logger = LoggerFactory.getLogger(ComplaintServiceImpl.class);
    private final ComplaintRepository complaintRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ComplaintServiceImpl(ComplaintRepository complaintRepository, SimpMessagingTemplate messagingTemplate) {
        this.complaintRepository = complaintRepository;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public Complaint registerComplaint(Complaint complaint) {
        logger.info("Registering new complaint: {}", complaint.getTitle());
        complaint.setStatus(ComplaintStatus.OPEN);
        Complaint savedComplaint = complaintRepository.save(complaint);
        
        messagingTemplate.convertAndSend("/topic/complaints", "New complaint: " + savedComplaint.getTitle());
        return savedComplaint;
    }

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Complaint not found with id: {}", id);
                    return new ResourceNotFoundException("Complaint not found with id: " + id);
                });
    }

    @Override
    public Complaint updateComplaintStatus(Long id, String status) {
        Complaint complaint = getComplaintById(id);
        logger.info("Updating complaint {} status to {}", id, status);
        
        try {
            ComplaintStatus newStatus = ComplaintStatus.valueOf(status.toUpperCase());
            complaint.setStatus(newStatus);
            
            if (newStatus == ComplaintStatus.RESOLVED) {
                complaint.setResolvedAt(LocalDateTime.now());
            }
            
            Complaint updatedComplaint = complaintRepository.save(complaint);
            messagingTemplate.convertAndSend("/topic/complaints/" + id, "Status updated to: " + newStatus);
            
            return updatedComplaint;
        } catch (IllegalArgumentException e) {
            logger.error("Invalid status update attempt for complaint {}: {}", id, status);
            throw new InvalidOperationException("Invalid status: " + status);
        }
    }
}
