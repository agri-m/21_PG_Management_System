package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Visitor;
import com.pgmanagement.entity.VisitorStatus;
import com.pgmanagement.repository.VisitorRepository;
import com.pgmanagement.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;

    @Autowired
    public VisitorServiceImpl(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @Override
    public Visitor addVisitor(Visitor visitor) {
        visitor.setInTime(LocalDateTime.now());
        visitor.setStatus(VisitorStatus.PENDING); // Pending approval
        return visitorRepository.save(visitor);
    }

    @Override
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @Override
    public Visitor getVisitorById(Long id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found with id: " + id));
    }

    @Override
    public Visitor updateVisitorStatus(Long id, String status) {
        // To be implemented in approval logic
        return null;
    }
}
