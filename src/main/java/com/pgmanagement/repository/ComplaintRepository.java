package com.pgmanagement.repository;

import com.pgmanagement.entity.Complaint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, Long> {
}
