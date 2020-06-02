package com.project.ClinicFinal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.ClinicFinal.model.Department;
import com.project.ClinicFinal.model.Doctor;
import com.project.ClinicFinal.model.DoctorDepartment;
import com.project.ClinicFinal.repository.DepartmentRepository;
import com.project.ClinicFinal.repository.DoctorDepartmentRepository;

@RestController
@CrossOrigin
public class DoctorDepartmentController {

	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
	private DoctorDepartmentRepository doctorDepartmentRepository;
	
 	
// getting doctor based on department
	@GetMapping("/optiondoctor")
	public ResponseEntity<?> getDoctor(@RequestParam String depName){
		Department department = departmentRepository.findBydepName(depName);
		List<Doctor> doctor = new ArrayList<Doctor>();
		
			List<DoctorDepartment> depDocTemp = doctorDepartmentRepository.findBydepartmentId(department);
			for(int j = 0; j < depDocTemp.size(); j++) {
				doctor.add(depDocTemp.get(j).getDoctorId());
			}
		
		for(int i = 0; i < doctor.size(); i++) {
			if(doctor.get(i).isDeleted() == true) {
				doctor.remove(i);
			}
		}
		
		return new ResponseEntity<List<Doctor>>(doctor, HttpStatus.OK);
	}

 }
