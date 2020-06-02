package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	Department findBydepName(String depName);

	List<Department> findBydepNameNotIn(List<String> nameArr);

	List<Department> findByIsDeletedFalse();

}
