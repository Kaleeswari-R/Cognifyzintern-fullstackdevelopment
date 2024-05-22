package com.example.StudentSpring.Controller;

import com.example.StudentSpring.Model.Studentdetails;
import com.example.StudentSpring.Repository.StudentdetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("http://localhost:3000")
public class StudentController {

    @Autowired
    StudentdetailsRepo studentdetailsRepo;

    @PostMapping("/addStudentdetails")
    public void addStudentdetails(@RequestBody Studentdetails studentdetails)
    {
       studentdetailsRepo.save(studentdetails);
    }

    @PutMapping("/updateStudent")
    public void updateStudent(@RequestBody Studentdetails studentdetails)
    {
        Studentdetails data=studentdetailsRepo.findById(studentdetails.getId()).orElse(null);

        if (data!=null)
        {
            data.setName(studentdetails.getName());
            data.setDepartment(studentdetails.getDepartment());
            data.setMobile(studentdetails.getMobile());

            studentdetailsRepo.save(data);
        }

    }

}
