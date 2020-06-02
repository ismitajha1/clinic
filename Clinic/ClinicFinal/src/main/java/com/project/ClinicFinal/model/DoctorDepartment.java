package com.project.ClinicFinal.model;

import javax.persistence.*;

@Entity
@Table(name="doctors_departments")
public class DoctorDepartment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctorId;
	
	@ManyToOne
	@JoinColumn(name="department_id")
	private Department departmentId;
	
	@Column(name="isDeleted")
	private boolean isDeleted;
	
	public DoctorDepartment() {}

	public DoctorDepartment(int id, Doctor doctorId, Department departmentId, boolean isDeleted) {
		super();
		this.id = id;
		this.doctorId = doctorId;
		this.departmentId = departmentId;
		this.isDeleted = isDeleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Doctor getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Doctor doctorId) {
		this.doctorId = doctorId;
	}

	public Department getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Department departmentId) {
		this.departmentId = departmentId;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}	
}
