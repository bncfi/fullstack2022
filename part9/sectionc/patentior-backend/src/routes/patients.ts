/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("huhuu");
  res.send(patientService.getEntries());
});

router.post("/", (req, res) => {
  console.log("postausta");
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(addedEntry);
  res.send("Saving some patient!");
});

export default router;
