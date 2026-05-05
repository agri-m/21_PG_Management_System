package com.pgmanagement.entity;

import com.pgmanagement.enums.RentStatus;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "rent_audit_logs")
public class RentAuditLog {

    @Id
    private Long id;

    private Long rentId;

    private RentStatus oldStatus;

    private RentStatus newStatus;

    private LocalDateTime changedAt;

    private String changedBy;

    public RentAuditLog() {}

    public RentAuditLog(Long rentId, RentStatus oldStatus, RentStatus newStatus, String changedBy) {
        this.rentId = rentId;
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
        this.changedAt = LocalDateTime.now();
        this.changedBy = changedBy;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getRentId() { return rentId; }
    public void setRentId(Long rentId) { this.rentId = rentId; }

    public RentStatus getOldStatus() { return oldStatus; }
    public void setOldStatus(RentStatus oldStatus) { this.oldStatus = oldStatus; }

    public RentStatus getNewStatus() { return newStatus; }
    public void setNewStatus(RentStatus newStatus) { this.newStatus = newStatus; }

    public LocalDateTime getChangedAt() { return changedAt; }
    public void setChangedAt(LocalDateTime changedAt) { this.changedAt = changedAt; }

    public String getChangedBy() { return changedBy; }
    public void setChangedBy(String changedBy) { this.changedBy = changedBy; }
}
