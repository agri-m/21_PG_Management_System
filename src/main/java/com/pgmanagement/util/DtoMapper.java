package com.pgmanagement.util;

import com.pgmanagement.dto.*;
import com.pgmanagement.entity.Complaint;
import com.pgmanagement.entity.Visitor;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {

    public Visitor toEntity(VisitorRequestDto dto) {
        Visitor visitor = new Visitor();
        visitor.setName(dto.getName());
        visitor.setContactNumber(dto.getContactNumber());
        visitor.setPurpose(dto.getPurpose());
        return visitor;
    }

    public VisitorResponseDto toDto(Visitor visitor) {
        VisitorResponseDto dto = new VisitorResponseDto();
        dto.setId(visitor.getId());
        dto.setName(visitor.getName());
        dto.setContactNumber(visitor.getContactNumber());
        dto.setPurpose(visitor.getPurpose());
        dto.setInTime(visitor.getInTime());
        dto.setOutTime(visitor.getOutTime());
        dto.setStatus(visitor.getStatus().name());
        return dto;
    }

    public Complaint toEntity(ComplaintRequestDto dto) {
        Complaint complaint = new Complaint();
        complaint.setTitle(dto.getTitle());
        complaint.setDescription(dto.getDescription());
        return complaint;
    }

    public ComplaintResponseDto toDto(Complaint complaint) {
        ComplaintResponseDto dto = new ComplaintResponseDto();
        dto.setId(complaint.getId());
        dto.setTitle(complaint.getTitle());
        dto.setDescription(complaint.getDescription());
        dto.setStatus(complaint.getStatus().name());
        dto.setCreatedAt(complaint.getCreatedAt());
        dto.setResolvedAt(complaint.getResolvedAt());
        return dto;
    }
}
