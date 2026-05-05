package com.pgmanagement.service;

import com.pgmanagement.entity.Visitor;
import java.util.List;

public interface VisitorService {
    Visitor addVisitor(Visitor visitor);
    List<Visitor> getAllVisitors();
    Visitor getVisitorById(Long id);
    Visitor updateVisitorStatus(Long id, String status);
}
