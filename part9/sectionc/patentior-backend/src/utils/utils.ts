import { newPatient, Gender } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing comment");
  }
  return text;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const toNewPatientEntry = (object: unknown): newPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const newEntry: newPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      ssn: parseString(object.ssn),
    };

    return newEntry;
  }
  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
