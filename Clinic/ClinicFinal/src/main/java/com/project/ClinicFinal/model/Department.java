package com.project.ClinicFinal.model;

import javax.persistence.*;

@Entity
@Table(name="department")
public class Department {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="department_name")
	private String depName;
	
	@Column(name="isDeleted")
	private boolean isDeleted;

	public Department() {
	}

	public Department(int id, String depName, boolean isDeleted) {
		super();
		this.id = id;
		this.depName = depName;
		this.isDeleted = isDeleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}	
}
