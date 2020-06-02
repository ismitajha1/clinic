package com.project.ClinicFinal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "nurse")
public class Nurse {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nName")
    private String nName;

    @Column(name = "licenseNo")
    private String licenseNo;
    
    @Column(name = "isDeleted")
    private Boolean isDeleted;

    public Nurse() {}
    
	public Nurse(Integer id, String nName, String licenseNo, Boolean isDeleted) {
		super();
		this.id = id;
		this.nName = nName;
		this.licenseNo = licenseNo;
		this.isDeleted = isDeleted;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getnName() {
		return nName;
	}

	public void setnName(String nName) {
		this.nName = nName;
	}

	public String getLicenseNo() {
		return licenseNo;
	}

	public void setLicenseNo(String licenseNo) {
		this.licenseNo = licenseNo;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
    
}
