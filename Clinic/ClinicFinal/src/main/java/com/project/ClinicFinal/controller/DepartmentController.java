package com.project.ClinicFinal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.ClinicFinal.model.Department;
import com.project.ClinicFinal.model.Doctor;
import com.project.ClinicFinal.model.DoctorDepartment;
import com.project.ClinicFinal.repository.DepartmentRepository;
import com.project.ClinicFinal.repository.DoctorDepartmentRepository;
import com.project.ClinicFinal.repository.DoctorRepository;

@RestController
@CrossOrigin
public class DepartmentController {
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private DepartmentRepository departmentRepository;

    @Autowired
	private DoctorDepartmentRepository doctorDepartmentRepository;
	

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> findAll() {
	List<Department> departments = departmentRepository.findByIsDeletedFalse();
	return new ResponseEntity<List<Department>>(departments, HttpStatus.OK);
    }

    @RequestMapping(path = "/departments", method = { RequestMethod.POST, RequestMethod.PUT })
    public ResponseEntity<Department> save(@RequestBody Department department) {
    	Department tempDept = departmentRepository.save(department);
	return new ResponseEntity<Department>(tempDept, HttpStatus.OK);
    }

    @RequestMapping(path = "/doctordepartment", method = { RequestMethod.POST, RequestMethod.PUT })
	public ResponseEntity<Department> save(@RequestBody List<Department> name, @RequestParam(name = "doctorid") int id) {
		Doctor doc = doctorRepository.findById(id).get();
		for (Department dept : name) {
			DoctorDepartment docdept = new DoctorDepartment();
			docdept.setDepartmentId(dept);
			docdept.setDoctorId(doc);
			doctorDepartmentRepository.save(docdept);
		}
		return new ResponseEntity<Department>(HttpStatus.OK);
	}
    
    
//for admit page department options    
	
    @GetMapping("/optiondepartment")
	public ResponseEntity<List<Department>> caseDepartment(@RequestParam String name){
		name += ",";
		System.out.println(name);
		List<String> nameArr = new ArrayList<String>();
		int checkPoint = 0;
		for(int i = 0; i < name.length(); i++) {
			String element = name.substring(i, i+1);
			if(element.equals(",")) {
				nameArr.add(name.substring(checkPoint, i));
				checkPoint = i+1;
			}
		}	
		System.out.println(nameArr);
		List<Department> department = departmentRepository.findBydepNameNotIn(nameArr);
		return new ResponseEntity<List<Department>>(department, HttpStatus.OK);
	}
}
