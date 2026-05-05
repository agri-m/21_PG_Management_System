package com.pgmanagement.service.impl;

import com.pgmanagement.entity.Visitor;
import com.pgmanagement.entity.VisitorStatus;
import com.pgmanagement.exception.ResourceNotFoundException;
import com.pgmanagement.exception.InvalidOperationException;
import com.pgmanagement.repository.VisitorRepository;
import com.pgmanagement.service.VisitorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitorServiceImpl implements VisitorService {

    private static final Logger logger = LoggerFactory.getLogger(VisitorServiceImpl.class);
    private final VisitorRepository visitorRepository;

    @Autowired
    public VisitorServiceImpl(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @Override
    public Visitor addVisitor(Visitor visitor) {
        logger.info("Registering new visitor entry for: {}", visitor.getName());
        visitor.setInTime(LocalDateTime.now());
        visitor.setStatus(VisitorStatus.PENDING);
        return visitorRepository.save(visitor);
    }

    @Override
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @Override
    public Visitor getVisitorById(Long id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Visitor not found with id: {}", id);
                    return new ResourceNotFoundException("Visitor not found with id: " + id);
                });
    }

    @Override
    public Visitor updateVisitorStatus(Long id, String status) {
        Visitor visitor = getVisitorById(id);
        logger.info("Updating status for visitor {} to {}", id, status);
        
        try {
            VisitorStatus newStatus = VisitorStatus.valueOf(status.toUpperCase());
            visitor.setStatus(newStatus);
            
            if (newStatus == VisitorStatus.CHECKED_OUT) {
                visitor.setOutTime(LocalDateTime.now());
            }
            
            return visitorRepository.save(visitor);
        } catch (IllegalArgumentException e) {
            logger.error("Invalid status update attempt for visitor {}: {}", id, status);
            throw new InvalidOperationException("Invalid status: " + status);
        }
    }
}
