package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ClinicFinal.model.Nurse;

public interface NurseRepository extends JpaRepository<Nurse, Integer> {

	List<Nurse> findByIsDeletedFalse();

	List<Nurse> findBynNameNotIn(List<String> nameArr);

	Nurse findBynName(String string);

}