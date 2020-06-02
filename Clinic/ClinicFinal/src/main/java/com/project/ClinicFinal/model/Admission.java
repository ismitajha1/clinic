package com.project.ClinicFinal.model;

import java.util.Date;

import javax.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "Admission")
public class Admission {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer aId;
	
	@ManyToOne
	private Patient patientId;
	
	@Column(name = "registeredAt")
	@CreationTimestamp
	private Date registeredAt;
	
	@Column(name = "symptoms")
	private String symptoms;
	
	public Admission() {}

	public Admission(Integer aId, Patient patientId, Date registeredAt, String symptoms) {
		super();
		this.aId = aId;
		this.patientId = patientId;
		this.registeredAt = registeredAt;
		this.symptoms = symptoms;
	}

	public Integer getaId() {
		return aId;
	}

	public void setaId(Integer aId) {
		this.aId = aId;
	}

	public Patient getPatientId() {
		return patientId;
	}

	public void setPatientId(Patient patientId) {
		this.patientId = patientId;
	}

	public Date getRegisteredAt() {
		return registeredAt;
	}

	public void setRegisteredAt(Date registeredAt) {
		this.registeredAt = registeredAt;
	}

	public String getSymptoms() {
		return symptoms;
	}

	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
	}
	
}
