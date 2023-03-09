import { default as patientData } from "../data/patients";
import { NonSensitivePatientEntry, patientType } from "../types/types";
import { v1 as uuid } from "uuid";

const getEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  gender: string,
  occupation: string,
  ssn: string
): patientType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const patientEntry: patientType = {
    id: id,
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation,
    ssn: ssn,
  };
  patientData.push(patientEntry);
  return patientEntry;
};

export default {
  getEntries,
  addPatient,
};
