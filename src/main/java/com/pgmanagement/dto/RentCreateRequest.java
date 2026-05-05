package com.pgmanagement.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class RentCreateRequest {

    @NotNull(message = "User ID cannot be null")
    private Long userId;

    @NotNull(message = "Room ID cannot be null")
    private Long roomId;

    @NotNull(message = "Amount cannot be null")
    @Min(value = 0, message = "Amount cannot be negative")
    private BigDecimal amount;

    @NotBlank(message = "Month cannot be blank")
    private String month;

    @NotNull(message = "Year cannot be null")
    private Integer year;

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
}
