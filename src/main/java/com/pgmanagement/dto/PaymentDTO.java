package com.pgmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentDTO {

    private Long id;
    private Long rentId;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private String transactionReference;
    private String paymentMethod;

    public PaymentDTO() {
    }

    public PaymentDTO(Long id, Long rentId, BigDecimal amount, LocalDate paymentDate, String transactionReference, String paymentMethod) {
        this.id = id;
        this.rentId = rentId;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.transactionReference = transactionReference;
        this.paymentMethod = paymentMethod;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRentId() {
        return rentId;
    }

    public void setRentId(Long rentId) {
        this.rentId = rentId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getTransactionReference() {
        return transactionReference;
    }

    public void setTransactionReference(String transactionReference) {
        this.transactionReference = transactionReference;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
