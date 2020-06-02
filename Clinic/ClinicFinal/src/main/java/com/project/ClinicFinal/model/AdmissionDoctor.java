package com.project.ClinicFinal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "AdmissionDoctor")
public class AdmissionDoctor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer adId;
	
	@ManyToOne
	private Admission admissionId;
	
	@ManyToOne
	private Doctor doctorId;
	
	public AdmissionDoctor() {}

	public AdmissionDoctor(Integer adId, Admission admissionId, Doctor doctorId) {
		super();
		this.adId = adId;
		this.admissionId = admissionId;
		this.doctorId = doctorId;
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

	public Doctor getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Doctor doctorId) {
		this.doctorId = doctorId;
	}
	
}
