import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
  console.log("huhuu");
  res.send(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving some diagnoses!");
});

export default router;
