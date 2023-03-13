import { default as patientData } from "../data/patients";
import {
  NonSensitivePatientEntry,
  patientType,
  Gender,
  newPatient,
} from "../types/types";
import { v1 as uuid } from "uuid";
import { parseGender } from "../utils/utils";

const getEntries = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    const parsedGender: Gender = parseGender(gender);
    const patient: NonSensitivePatientEntry = {
      id: id,
      name: name,
      dateOfBirth: dateOfBirth,
      gender: parsedGender,
      occupation,
    };
    return patient;
  });
};

const addPatient = (entry: newPatient): patientType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  /*
  console.log(name, dateOfBirth, gender, occupation, ssn);
  const patientEntry: patientType = {
    id: id,
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    occupation: occupation,
    ssn: ssn,
  };
  */
  const patientEntry = { id: id, ...entry };
  patientData.push(patientEntry);
  console.log(patientEntry);
  return patientEntry;
};

export default {
  getEntries,
  addPatient,
};
