package com.project.ClinicFinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.ClinicFinal.model.Doctor;
import com.project.ClinicFinal.model.DoctorList;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

List<Doctor> findByIsDeletedFalse();
	
	
	@Query(value="select doc.doctor_id doctorid,doc.doctor_name doctorname,doc.nmc_number nmcNo,dept.department_name departmentname from doctor doc " + 
			"join " + 
			"(select group_concat(dept.department_name) as department_name,docdept.doctor_id from doctors_departments docdept " + 
			"left join department dept on dept.id = docdept.department_id " + 
			" where dept.is_deleted = false group by docdept.doctor_id " + 
			") dept on dept.doctor_id = doc.doctor_id " + 
			"where doc.is_deleted = false", nativeQuery =true)
	List<DoctorList> getDoctorList();
}

