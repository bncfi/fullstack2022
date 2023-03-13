import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/utils";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("huhuu");
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  try {
    console.log("postausta");
    const newDiaryEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
