package com.pgmanagement.mapper;

import com.pgmanagement.dto.RentCreateRequest;
import com.pgmanagement.dto.RentResponse;
import com.pgmanagement.entity.Rent;
import org.springframework.stereotype.Component;

@Component
public class RentMapper {

    public Rent toEntity(RentCreateRequest request) {
        Rent rent = new Rent();
        rent.setUserId(request.getUserId());
        rent.setRoomId(request.getRoomId());
        rent.setAmount(request.getAmount());
        rent.setMonth(request.getMonth());
        rent.setYear(request.getYear());
        return rent;
    }

    public RentResponse toResponse(Rent rent) {
        RentResponse response = new RentResponse();
        response.setId(rent.getId());
        response.setUserId(rent.getUserId());
        response.setRoomId(rent.getRoomId());
        response.setAmount(rent.getAmount());
        response.setMonth(rent.getMonth());
        response.setYear(rent.getYear());
        response.setStatus(rent.getStatus());
        response.setPaymentDate(rent.getPaymentDate());
        return response;
    }
}
