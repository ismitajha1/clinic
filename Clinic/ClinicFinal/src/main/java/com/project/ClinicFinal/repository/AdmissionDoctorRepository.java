package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Admission;
import com.project.ClinicFinal.model.AdmissionDoctor;


public interface AdmissionDoctorRepository extends JpaRepository<AdmissionDoctor, Integer>{

	List<AdmissionDoctor> findByadmissionId(Admission admission);

}
