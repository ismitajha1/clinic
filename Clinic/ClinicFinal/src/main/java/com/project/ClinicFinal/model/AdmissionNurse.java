package com.project.ClinicFinal.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "AdmissionNurse")
public class AdmissionNurse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer adId;
	
	@ManyToOne
	private Admission admissionId;
	
	@ManyToOne
	private Nurse nurseId;
	
	public AdmissionNurse() {}

	public AdmissionNurse(Integer adId, Admission admissionId, Nurse nurseId) {
		super();
		this.adId = adId;
		this.admissionId = admissionId;
		this.nurseId = nurseId;
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

	public Nurse getNurseId() {
		return nurseId;
	}

	public void setNurseId(Nurse nurseId) {
		this.nurseId = nurseId;
	}
}	
