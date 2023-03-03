import express from "express";
//import { BmiValues } from './bmiCalculator'
import { calculateBmi } from "./bmiCalculator";
const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
