package com.pgmanagement.service;

import com.pgmanagement.entity.Complaint;
import java.util.List;

public interface ComplaintService {
    Complaint registerComplaint(Complaint complaint);
    List<Complaint> getAllComplaints();
    Complaint getComplaintById(Long id);
    Complaint updateComplaintStatus(Long id, String status);
}
