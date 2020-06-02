package com.project.ClinicFinal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Admin;


public interface AdminRepository extends JpaRepository<Admin, Integer>{
	Admin findByUsernameAndPassword(String user, String pass);
}
