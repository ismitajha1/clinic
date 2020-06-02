package com.project.ClinicFinal.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.ClinicFinal.model.Department;
import com.project.ClinicFinal.model.Doctor;
import com.project.ClinicFinal.model.DoctorDepartment;
import com.project.ClinicFinal.model.DoctorList;
import com.project.ClinicFinal.repository.DepartmentRepository;
import com.project.ClinicFinal.repository.DoctorDepartmentRepository;
import com.project.ClinicFinal.repository.DoctorRepository;


@RestController
@CrossOrigin
public class DoctorController {
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private DepartmentRepository departmentRepository;
	
	@Autowired
	private DoctorDepartmentRepository doctorDepartmentRepository;
	
	@GetMapping("/doctors")
	public ResponseEntity<List<DoctorList>> findAll() {
		List<DoctorList> doctor = doctorRepository.getDoctorList();
		return new ResponseEntity<List<DoctorList>>(doctor, HttpStatus.OK);
	}
	
	@GetMapping("/doctor")
    public ResponseEntity<Doctor> findDoctor(@RequestParam Integer id) {
	Doctor doctors = doctorRepository.findById(id).get();
	return new ResponseEntity<Doctor>(doctors, HttpStatus.OK);
    }

    
    @RequestMapping(path = "/doctors", method = { RequestMethod.POST, RequestMethod.PUT })
	public ResponseEntity<Doctor> save(@RequestBody Doctor doctor, @RequestParam(name="departments") String[] departments) {	
		Doctor tempdoctor = doctorRepository.save(doctor);
		for(String departmentid: departments) {
			Department tmpdepartment = departmentRepository.findById(Integer.parseInt(departmentid)).get();
			DoctorDepartment docdept = new DoctorDepartment();
			docdept.setDepartmentId(tmpdepartment);
			docdept.setDoctorId(tempdoctor);
			doctorDepartmentRepository.save(docdept);
			}
		return new ResponseEntity<Doctor>(tempdoctor, HttpStatus.OK);
	}
    
    @GetMapping("/finddoctors")
	public ResponseEntity<Doctor> findOne(@RequestParam(name="doctorid") String id){
		Optional<Doctor> tempdoctor = doctorRepository.findById(Integer.parseInt(id));
		if (!tempdoctor.isPresent()) {
			return new ResponseEntity<Doctor>(HttpStatus.NOT_FOUND);
		}else 
		{
			return new ResponseEntity<Doctor>(tempdoctor.get(), HttpStatus.OK);
		}
	}

    @DeleteMapping("/doctors/{id}")
    public ResponseEntity<Doctor> delete(@PathVariable Integer id) {
    	Doctor doctor = doctorRepository.findById(id).get();
		doctor.setDeleted(true);
		doctorRepository.save(doctor);
	return new ResponseEntity<Doctor>(doctor, HttpStatus.OK);
    }

	
}
