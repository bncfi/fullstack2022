import { default as diagnosesData } from "../data/diagnoses";
import { diagnoseType } from "../types/types";

const getEntries = (): diagnoseType[] => {
  return diagnosesData;
};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
};
