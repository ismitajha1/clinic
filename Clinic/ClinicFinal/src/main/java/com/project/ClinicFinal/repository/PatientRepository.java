package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

	List<Patient> findByNameContainingIgnoreCase(String str);

}
