package com.example.StudentSpring.Repository;

import com.example.StudentSpring.Model.Studentdetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentdetailsRepo extends MongoRepository<Studentdetails,String> {

}
