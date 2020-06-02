package com.project.ClinicFinal.controller;

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

import com.project.ClinicFinal.model.Patient;
import com.project.ClinicFinal.repository.PatientRepository;


@RestController
@CrossOrigin
public class PatientController {

	@Autowired
    private PatientRepository patientRepository;

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> findAll() {
	List<Patient> patients = patientRepository.findAll();
	return new ResponseEntity<List<Patient>>(patients, HttpStatus.OK);
    }

    @RequestMapping(path = "/patients", method = { RequestMethod.POST, RequestMethod.PUT })
    public ResponseEntity<Patient> save(@RequestBody Patient patient) {
    	Patient tempPatient = patientRepository.save(patient);
	return new ResponseEntity<Patient>(tempPatient, HttpStatus.OK);
    }


    @GetMapping("/filterpatient")
	public ResponseEntity<List<Patient>> getFilteredPatients(@RequestParam(name= "str") String str){
    	List<Patient> filteredpatients = patientRepository.findByNameContainingIgnoreCase(str);
    	return new ResponseEntity<List<Patient>>(filteredpatients, HttpStatus.OK);
	}
    
    
}
