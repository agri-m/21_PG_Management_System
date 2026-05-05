package com.pgmanagement.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentUploadRequest {

    @NotNull(message = "Rent ID cannot be null")
    private Long rentId;

    @NotNull(message = "Amount cannot be null")
    private BigDecimal amount;

    @NotNull(message = "Payment date cannot be null")
    private LocalDate paymentDate;

    private String transactionReference;
    private String paymentMethod;

    public PaymentUploadRequest() {
    }

    public Long getRentId() { return rentId; }
    public void setRentId(Long rentId) { this.rentId = rentId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
