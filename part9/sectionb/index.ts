/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.body);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    const bmiResponse = { height: height, weight: weight, bmi: bmi };
    res.status(200).send(bmiResponse);
  } else {
    res.status(400).send("malformatted parameters");
  }
});

app.get("/exercises", (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (req.body.daily_exercises === undefined || req.body.target === undefined) {
    res.status(400).send("parameters missing");
    throw new Error("Provided values were not numbers!");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  req.body.daily_exercises.map((day: any) => {
    if (!isNaN(Number(day))) {
      return Number(day);
    } else {
      res.status(400).send("malformatted parameters");
      throw new Error("Provided values were not numbers!");
    }
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const results = calculateExercise(req.body);
  res.status(200).send(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
