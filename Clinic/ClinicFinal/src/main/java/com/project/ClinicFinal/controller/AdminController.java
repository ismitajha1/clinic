package com.project.ClinicFinal.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.ClinicFinal.model.Admin;
import com.project.ClinicFinal.repository.AdminRepository;


@RestController
@CrossOrigin
public class AdminController {
	@Autowired
	public AdminRepository adminRepo;
	
	@PostMapping("/admin")
	public ResponseEntity<Admin> admin(@RequestBody Admin admin){
		Admin user = adminRepo.findByUsernameAndPassword(admin.getUsername(), admin.getPassword());
		return new ResponseEntity<Admin>(user,  HttpStatus.OK);
	}
}