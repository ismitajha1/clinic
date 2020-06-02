package com.project.ClinicFinal.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.ClinicFinal.model.Nurse;
import com.project.ClinicFinal.repository.NurseRepository;

@RestController
@CrossOrigin
public class NurseController {
	
	@Autowired
	    private NurseRepository nurseRepository;

	    @GetMapping("/nurses")
	    public ResponseEntity<List<Nurse>> findAll() {
		List<Nurse> nurses = nurseRepository.findByIsDeletedFalse();
		return new ResponseEntity<List<Nurse>>(nurses, HttpStatus.OK);
	    }

	    @RequestMapping(path = "/nurses", method = { RequestMethod.POST, RequestMethod.PUT })
	    public ResponseEntity<Nurse> save(@RequestBody Nurse nurse) {
	    	nurse.setIsDeleted(false);
			nurseRepository.save(nurse);
		return new ResponseEntity<Nurse>(nurse, HttpStatus.OK);
	    }

	    @DeleteMapping("/nurses/{id}")
	    public ResponseEntity<Nurse> delete(@PathVariable Integer id) {
	    	Nurse nurse = nurseRepository.findById(id).get();
			nurse.setIsDeleted(true);
			nurseRepository.save(nurse);
		return new ResponseEntity<Nurse>(nurse, HttpStatus.OK);
	    }
	    
//admit page nurse drop down	    
	    @GetMapping("/optionnurse")
		public ResponseEntity<?> caseNurse(@RequestParam String name) {
			name += ",";
			System.out.println(name);
			List<String> nameArr = new ArrayList<String>();
			int checkPoint = 0;
			for (int i = 0; i < name.length(); i++) {
				String element = name.substring(i, i + 1);
				if (element.equals(",")) {
					nameArr.add(name.substring(checkPoint, i));
					checkPoint = i + 1;
				}
			}
			
			System.out.println(nameArr);
			List<Nurse> nurse = nurseRepository.findBynNameNotIn(nameArr);
			for(int i = 0; i < nurse.size(); i++) {
				if(nurse.get(i).getIsDeleted() == true) {
					nurse.remove(i);
				}
			}
			return new ResponseEntity<List<Nurse>>(nurse, HttpStatus.OK);

		}
}
