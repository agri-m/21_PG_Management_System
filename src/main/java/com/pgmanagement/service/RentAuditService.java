package com.pgmanagement.service;

import com.pgmanagement.entity.RentAuditLog;
import com.pgmanagement.enums.RentStatus;
import com.pgmanagement.repository.RentAuditLogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RentAuditService {

    private static final Logger log = LoggerFactory.getLogger(RentAuditService.class);
    private final RentAuditLogRepository auditLogRepository;

    @Autowired
    public RentAuditService(RentAuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void logStatusChange(Long rentId, RentStatus oldStatus, RentStatus newStatus, String changedBy) {
        log.info("Recording audit log for rent ID {}: {} -> {}", rentId, oldStatus, newStatus);
        RentAuditLog auditLog = new RentAuditLog(rentId, oldStatus, newStatus, changedBy);
        auditLogRepository.save(auditLog);
    }
}
