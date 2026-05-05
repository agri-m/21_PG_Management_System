package com.pgmanagement.entity;

import com.pgmanagement.enums.RentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "rents")
public class Rent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "User ID cannot be null")
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NotNull(message = "Room ID cannot be null")
    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @NotNull(message = "Amount cannot be null")
    @Min(value = 0, message = "Amount cannot be negative")
    @Column(nullable = false)
    private BigDecimal amount;

    @NotBlank(message = "Month cannot be blank")
    @Column(nullable = false)
    private String month;

    @NotNull(message = "Year cannot be null")
    @Column(nullable = false)
    private Integer year;

    @NotNull(message = "Status cannot be null")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RentStatus status;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    public Rent() {
    }

    public Rent(Long userId, Long roomId, BigDecimal amount, String month, Integer year, RentStatus status) {
        this.userId = userId;
        this.roomId = roomId;
        this.amount = amount;
        this.month = month;
        this.year = year;
        this.status = status;
    }

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
