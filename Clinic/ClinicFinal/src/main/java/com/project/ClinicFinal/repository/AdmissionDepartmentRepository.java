package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Admission;
import com.project.ClinicFinal.model.AdmissionDepartment;

public interface AdmissionDepartmentRepository extends JpaRepository<AdmissionDepartment, Integer>{

	List<AdmissionDepartment> findByadmissionId(Admission admission);

}
