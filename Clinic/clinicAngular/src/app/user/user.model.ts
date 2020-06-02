import { PatientComponentState, Patient } from './patient/patient.model';
import { NurseComponentState, Nurse } from './nurse/nurse.model';
import { DoctorComponentState, Doctor } from './doctor/doctor.model';
import { DepartmentComponentState, Department } from './department/department.model';

export class Admission{
    aId: number;
    patientId: Patient;
    registeredAt: string;
    symptoms: string;
}

export class DepartmentDoctor{
    ddId: number;
    doctorId: Doctor;
    departmentId:Department;
}

export class AdmissionDepartment{
    adId: number;
    admissionId: Admission;
    departmentId: Department;
}

export class AdmissionDoctor{
    adocId: number;
    doctorId: Doctor;
    admissionId: Admission;
}

export class AdmissionNurse{
    anId: number;
    nurseId: Nurse;
    admissionId: Admission;
}

export class Admit{
    patient: Patient[];
    department: string[];
    doctor: string[];
    nurse: string[];
    symptoms: string;
    registeredAt: string;
}

export interface AppState {
    patientComponent: PatientComponentState;
    nurseComponent: NurseComponentState;
    doctorComponent: DoctorComponentState;
    departmentComponent: DepartmentComponentState;
}