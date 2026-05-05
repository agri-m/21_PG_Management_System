package com.pgmanagement.dto;

import com.pgmanagement.enums.RentStatus;
import java.math.BigDecimal;
import java.time.LocalDate;

public class RentResponse {

    private Long id;
    private Long userId;
    private Long roomId;
    private BigDecimal amount;
    private String month;
    private Integer year;
    private RentStatus status;
    private LocalDate paymentDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public RentStatus getStatus() { return status; }
    public void setStatus(RentStatus status) { this.status = status; }

    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
}
