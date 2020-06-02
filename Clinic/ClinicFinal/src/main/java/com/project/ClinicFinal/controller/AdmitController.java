package com.project.ClinicFinal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.project.ClinicFinal.model.Admission;
import com.project.ClinicFinal.model.AdmissionDepartment;
import com.project.ClinicFinal.model.AdmissionDoctor;
import com.project.ClinicFinal.model.AdmissionNurse;
import com.project.ClinicFinal.model.Admit;
import com.project.ClinicFinal.model.Department;
import com.project.ClinicFinal.model.Doctor;
import com.project.ClinicFinal.model.DoctorDepartment;
import com.project.ClinicFinal.model.Nurse;
import com.project.ClinicFinal.model.Patient;
import com.project.ClinicFinal.repository.AdmissionDepartmentRepository;
import com.project.ClinicFinal.repository.AdmissionDoctorRepository;
import com.project.ClinicFinal.repository.AdmissionNurseRepository;
import com.project.ClinicFinal.repository.AdmissionRepository;
import com.project.ClinicFinal.repository.DepartmentRepository;
import com.project.ClinicFinal.repository.DoctorDepartmentRepository;
import com.project.ClinicFinal.repository.DoctorRepository;
import com.project.ClinicFinal.repository.NurseRepository;
import com.project.ClinicFinal.repository.PatientRepository;

@RestController
@CrossOrigin
public class AdmitController {

	@Autowired
	public DoctorDepartmentRepository doctorDepartmentRepository;

	@Autowired
	public DepartmentRepository departmentRepository;

	@Autowired
	public DoctorRepository doctorRepository;

	@Autowired
	public NurseRepository nurseRepository;

	@Autowired
	public PatientRepository patientRepository;

	@Autowired
	public AdmissionRepository admissionRepository;

	@Autowired
	public AdmissionDoctorRepository admissionDoctorRepository;

	@Autowired
	public AdmissionNurseRepository admissionNurseRepository;

	@Autowired
	public AdmissionDepartmentRepository admissionDepartmentRepository;

	@PostMapping("/admitpatient")
	public ResponseEntity<?> admit(@RequestBody Admit admitForm) {
	
		System.out.println(admitForm.getSymptoms());
		System.out.println(admitForm.getPatient().getName());

		Admission admission = new Admission();

		admission.setPatientId(admitForm.getPatient());
		admission.setSymptoms(admitForm.getSymptoms());
		admission.setRegisteredAt(admitForm.getRegisteredAt());
		admissionRepository.save(admission);

		for (int i = 0; i < admitForm.getDepartment().size(); i++) {
			AdmissionDepartment bufferAd = new AdmissionDepartment();
			bufferAd.setAdmissionId(admissionRepository.findByPatientIdAndSymptoms(admitForm.getPatient(), admitForm.getSymptoms()));
			bufferAd.setDepartmentId(departmentRepository.findBydepName(admitForm.getDepartment().get(i)));
			admissionDepartmentRepository.save(bufferAd);
		}

		for (int i = 0; i < admitForm.getDoctor().size(); i++) {
			String strBuffer = admitForm.getDoctor().get(i);
			int lastIndex = strBuffer.indexOf("-");
			String docName = strBuffer.substring(0, lastIndex);
			String depName = strBuffer.substring(lastIndex + 1, strBuffer.length());

			Department departBuffer = departmentRepository.findBydepName(depName);
			List<DoctorDepartment> depdocBuffer = doctorDepartmentRepository.findBydepartmentId(departBuffer);

			for (int j = 0; j < depdocBuffer.size(); j++) {

				Doctor docBuffer = depdocBuffer.get(j).getDoctorId();
				if (docBuffer.getdName().equals(docName)) {
					AdmissionDoctor addocBuffer = new AdmissionDoctor();
					addocBuffer.setAdmissionId(admissionRepository.findByPatientIdAndSymptoms(admitForm.getPatient(), admitForm.getSymptoms()));
					addocBuffer.setDoctorId(docBuffer);
					admissionDoctorRepository.save(addocBuffer);
					break;
				}
			}
		}
		
		for(int k = 0; k < admitForm.getNurse().size(); k++) {
			AdmissionNurse adNurseBuffer = new AdmissionNurse();
			Nurse nurse = nurseRepository.findBynName(admitForm.getNurse().get(k));
			Admission admissionBuffer = admissionRepository.findByPatientIdAndSymptoms(admitForm.getPatient(), admitForm.getSymptoms());
			
			adNurseBuffer.setNurseId(nurse);
			adNurseBuffer.setAdmissionId(admissionBuffer);
			admissionNurseRepository.save(adNurseBuffer);	
		}
		return new ResponseEntity<Admit>(admitForm, HttpStatus.OK);
	}
	
//	@GetMapping("/details/{patientId}")
//    public ResponseEntity<?> listPatientAdmission(@PathVariable Integer patientId) {
//		Patient patient = patientRepository.findById(patientId).get();
//		List<Admission> admissiontemp = admissionRepository.findBypatientId(patient);
//	return new ResponseEntity<List<Admission>>(admissiontemp, HttpStatus.OK);
//    }
//	
//	@GetMapping("/admissiondepartments/{admissionId}")
//	  public ResponseEntity<?> listDepartmentAdmission(@PathVariable Integer admissionId) {
//			Admission admission = admissionRepository.findById(admissionId).get();
//			List<AdmissionDepartment> departmenttemp = admissionDepartmentRepository.findByadmissionId(admission);
//		return new ResponseEntity<List<AdmissionDepartment>>(departmenttemp, HttpStatus.OK);
//	  }
//	
//	@GetMapping("/admissiondoctors/{admissionId}")
//	  public ResponseEntity<?> listDoctorAdmission(@PathVariable Integer admissionId) {
//			Admission admission = admissionRepository.findById(admissionId).get();
//			List<AdmissionDoctor> doctortemp = admissionDoctorRepository.findByadmissionId(admission);
//		return new ResponseEntity<List<AdmissionDoctor>>(doctortemp, HttpStatus.OK);
//	  }
//	
//	@GetMapping("/admissionnurses/{admissionId}")
//	  public ResponseEntity<?> listNurseAdmission(@PathVariable Integer admissionId) {
//			Admission admission = admissionRepository.findById(admissionId).get();
//			List<AdmissionNurse> nursetemp = admissionNurseRepository.findByadmissionId(admission);
//		return new ResponseEntity<List<AdmissionNurse>>(nursetemp, HttpStatus.OK);
//	  }
//	
	@GetMapping("/admissiondoctor/{admissionId}")
	  public ResponseEntity<?> getlistDoctorAdmission(@PathVariable Integer admissionId) {
			Admission admission = admissionRepository.findById(admissionId).get();
			List<String> doctorstemp = new ArrayList<String>();
			List<AdmissionDoctor> admDoc = admissionDoctorRepository.findByadmissionId(admission);
			for(AdmissionDoctor admdocTemp: admDoc) {
				doctorstemp.add(admdocTemp.getDoctorId().getdName());
			}
		return new ResponseEntity<List<String>>(doctorstemp, HttpStatus.OK);
	  }
	
	@GetMapping("/admissiondept/{admissionId}")
	  public ResponseEntity<?> getlistDeptrAdmission(@PathVariable Integer admissionId) {
			Admission admission = admissionRepository.findById(admissionId).get();
			List<String> deptstemp = new ArrayList<String>();
			List<AdmissionDepartment> admDept = admissionDepartmentRepository.findByadmissionId(admission);
			for(AdmissionDepartment admdeptTemp: admDept) {
				deptstemp.add(admdeptTemp.getDepartmentId().getDepName());
			}
		return new ResponseEntity<List<String>>(deptstemp, HttpStatus.OK);
	  }
	
	@GetMapping("/admissionnurse/{admissionId}")
	  public ResponseEntity<?> getlistNurseAdmission(@PathVariable Integer admissionId) {
			Admission admission = admissionRepository.findById(admissionId).get();
			List<String> nursetemp = new ArrayList<String>();
			List<AdmissionNurse> admNurse = admissionNurseRepository.findByadmissionId(admission);
			for(AdmissionNurse admnurseTemp: admNurse) {
				nursetemp.add(admnurseTemp.getNurseId().getnName());
			}
		return new ResponseEntity<List<String>>(nursetemp, HttpStatus.OK);
	  }
	
	@GetMapping("/detail/{patientId}")
    public ResponseEntity<?> listAdmissionDetail(@PathVariable Integer patientId) {
		Patient patient = patientRepository.findById(patientId).get();
		List<Admission> admissiontemp = admissionRepository.findBypatientId(patient);
		
		List<Admit> admitlist = new ArrayList<Admit>();
		
		for (Admission admissionId : admissiontemp)  
        { 			
			Admit admit = new Admit();
			List<String> doctorstemp = new ArrayList<String>();	
			List<String> nursetemp = new ArrayList<String>();
			List<String> deptstemp = new ArrayList<String>();
			List<AdmissionDoctor> admDoc = admissionDoctorRepository.findByadmissionId(admissionId);
			for(AdmissionDoctor admdocTemp: admDoc) {
				doctorstemp.add(admdocTemp.getDoctorId().getdName());
			}
			
			List<AdmissionDepartment> admDept = admissionDepartmentRepository.findByadmissionId(admissionId);
			for(AdmissionDepartment admdeptTemp: admDept) {
				deptstemp.add(admdeptTemp.getDepartmentId().getDepName());
			}
			
			List<AdmissionNurse> admNurse = admissionNurseRepository.findByadmissionId(admissionId);
			for(AdmissionNurse admnurseTemp: admNurse) {
				nursetemp.add(admnurseTemp.getNurseId().getnName());
			}
			
			admit.setPatient(patient);
			admit.setSymptoms(admissionId.getSymptoms());
			admit.setRegisteredAt(admissionId.getRegisteredAt());
			admit.setDepartment(deptstemp);
			admit.setDoctor(doctorstemp);
			admit.setNurse(nursetemp);
			admitlist.add(admit);
		}
		
			
	return new ResponseEntity<List<Admit>>(admitlist, HttpStatus.OK);
    }
			
}
