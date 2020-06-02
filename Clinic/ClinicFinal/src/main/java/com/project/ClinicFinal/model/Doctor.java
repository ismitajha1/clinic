package com.project.ClinicFinal.model;

import javax.persistence.*;

@Entity
@Table(name ="doctor")
public class Doctor {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="doctor_id")
	private int id;

	@Column(name ="doctor_name")
	private String dName;
	
	@Column(name ="nmc_number")
	private String nmcNo;
	
	@Column(name="isDeleted")
	private boolean isDeleted;

	public Doctor() {
	}

	public Doctor(int id, String dName, String nmcNo, boolean isDeleted) {
		super();
		this.id = id;
		this.dName = dName;
		this.nmcNo = nmcNo;
		this.isDeleted = isDeleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getdName() {
		return dName;
	}

	public void setdName(String dName) {
		this.dName = dName;
	}

	public String getNmcNo() {
		return nmcNo;
	}

	public void setNmcNo(String nmcNo) {
		this.nmcNo = nmcNo;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}
