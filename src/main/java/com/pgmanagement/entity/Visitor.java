package com.pgmanagement.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "visitors")
public class Visitor {

    @Id
    private Long id;

    private String name;

    private String contactNumber;

    private String purpose;

    private LocalDateTime inTime;

    private LocalDateTime outTime;

    private VisitorStatus status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public LocalDateTime getInTime() {
        return inTime;
    }

    public void setInTime(LocalDateTime inTime) {
        this.inTime = inTime;
    }

    public LocalDateTime getOutTime() {
        return outTime;
    }

    public void setOutTime(LocalDateTime outTime) {
        this.outTime = outTime;
    }

    public VisitorStatus getStatus() {
        return status;
    }

    public void setStatus(VisitorStatus status) {
        this.status = status;
    }
}
