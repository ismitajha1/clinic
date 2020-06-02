package com.project.ClinicFinal.model;

import javax.persistence.*;

@Entity
@Table(name = "AdmissionDepartment")
public class AdmissionDepartment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer adId;
	
	@ManyToOne
	private Admission admissionId;
	
	@ManyToOne
	private Department departmentId;
	
	public AdmissionDepartment() {}

	public AdmissionDepartment(Integer adId, Admission admissionId, Department departmentId) {
		super();
		this.adId = adId;
		this.admissionId = admissionId;
		this.departmentId = departmentId;
	}

	public Integer getAdId() {
		return adId;
	}

	public void setAdId(Integer adId) {
		this.adId = adId;
	}

	public Admission getAdmissionId() {
		return admissionId;
	}

	public void setAdmissionId(Admission admissionId) {
		this.admissionId = admissionId;
	}

	public Department getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Department departmentId) {
		this.departmentId = departmentId;
	}
		
}