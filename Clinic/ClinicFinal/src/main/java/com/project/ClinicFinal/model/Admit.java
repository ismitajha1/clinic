package com.project.ClinicFinal.model;

import java.util.Date;
import java.util.List;

public class Admit {
	
	private Patient patient;
	private String symptoms;
	private Date registeredAt;
	private List<String> doctor;
	private List<String> nurse;
	private List<String> department;
	
	public Admit() {}
	
	public Admit(Patient patient, String symptoms,Date registeredAt, List<String> doctor, List<String> nurse, List<String> department) {
		super();
		this.patient = patient;
		this.symptoms = symptoms;
		this.registeredAt = registeredAt;
		this.doctor = doctor;
		this.nurse = nurse;
		this.department = department;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public String getSymptoms() {
		return symptoms;
	}

	public void setSymptoms(String symptoms) {
		this.symptoms = symptoms;
	}

	public Date getRegisteredAt() {
		return registeredAt;
	}

	public void setRegisteredAt(Date registeredAt) {
		this.registeredAt = registeredAt;
	}

	public List<String> getDoctor() {
		return doctor;
	}

	public void setDoctor(List<String> doctor) {
		this.doctor = doctor;
	}

	public List<String> getNurse() {
		return nurse;
	}

	public void setNurse(List<String> nurse) {
		this.nurse = nurse;
	}

	public List<String> getDepartment() {
		return department;
	}

	public void setDepartment(List<String> department) {
		this.department = department;
	}
	
}
