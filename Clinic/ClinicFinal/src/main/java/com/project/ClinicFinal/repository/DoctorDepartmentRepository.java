package com.project.ClinicFinal.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Department;
import com.project.ClinicFinal.model.DoctorDepartment;

public interface DoctorDepartmentRepository extends JpaRepository<DoctorDepartment, Integer> {

	List<DoctorDepartment> findBydepartmentId(Department department);


}
