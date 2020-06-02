package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Admission;
import com.project.ClinicFinal.model.AdmissionNurse;

public interface AdmissionNurseRepository extends JpaRepository<AdmissionNurse, Integer>{

	List<AdmissionNurse> findByadmissionId(Admission admission);

}
