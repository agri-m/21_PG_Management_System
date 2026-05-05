package com.pgmanagement.entity;

import com.pgmanagement.enums.RentStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rent_audit_logs")
public class RentAuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rent_id", nullable = false)
    private Long rentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "old_status")
    private RentStatus oldStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false)
    private RentStatus newStatus;

    @Column(name = "changed_at", nullable = false)
    private LocalDateTime changedAt;

    @Column(name = "changed_by")
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
