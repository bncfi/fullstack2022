import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getEntries());
});

router.get("/:id", (req, res) => {
  console.log(patientService.findOne(req.params.id));
  res.send(patientService.findOne(req.params.id));
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
