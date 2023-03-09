import express from "express";
import patientService from "../services/patientService";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("huhuu");
  res.send(patientService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving some patient!");
});

export default router;
