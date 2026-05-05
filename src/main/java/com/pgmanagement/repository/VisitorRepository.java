package com.pgmanagement.repository;

import com.pgmanagement.entity.Visitor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepository extends MongoRepository<Visitor, Long> {
}
