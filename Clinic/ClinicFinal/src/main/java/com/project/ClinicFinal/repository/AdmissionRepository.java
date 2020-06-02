package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Admission;
import com.project.ClinicFinal.model.Patient;

public interface AdmissionRepository extends JpaRepository<Admission, Integer>{

	Admission findByPatientIdAndSymptoms(Patient patient, String symptoms);

	List<Admission> findBypatientId(Patient patient);

	Admission findByPatientId(Patient patient);
	
}
