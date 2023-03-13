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
  gender: Gender;
  occupation: string;
}

export interface newPatient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Nonbinary = "non-binary",
  They = "they",
  Other = "other",
}

export type NonSensitivePatientEntry = Omit<patientType, "ssn">;
