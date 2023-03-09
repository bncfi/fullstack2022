export interface diagnoseType {
  code: string;
  name: string;
  latin?: string;
}

export interface patientType {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<patientType, "ssn">;
