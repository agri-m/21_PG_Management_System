package com.pgmanagement.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "complaints")
public class Complaint {

    @Id
    private Long id;

    private String title;

    private String description;

    private ComplaintStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime resolvedAt;

    // @PrePersist (MongoDB doesn't support this natively, consider @CreatedDate or lifecycle events)
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = ComplaintStatus.OPEN;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getResolvedAt() {
        return resolvedAt;
    }

    public void setResolvedAt(LocalDateTime resolvedAt) {
        this.resolvedAt = resolvedAt;
    }
}
