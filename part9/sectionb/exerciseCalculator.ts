const parseArray = (args: string[]): exerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const hours: number[] = args.slice(3).map((day) => {
    const perDay = parseFloat(day);
    if (typeof perDay === 'number') {
      return perDay;
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  if (!isNaN(Number(args[2]))) {
    const target = Number(Number(args[2]));
    return { hours, target };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface exerciseData {
  hours: number[]
  target: number
}

interface weekResults {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  avarage: number
}

const calculateExercise = (args: exerciseData): weekResults => {
  const results = {} as weekResults;

  results.periodLength = args.hours.length;
  results.avarage =
    args.hours.reduce(
      (accumulator: number, current: number) => accumulator + current
    ) / results.periodLength;

  results.success = results.avarage >= args.target ? true : false;
  results.rating = results.success ? 5 : 0;
  results.ratingDescription = results.success ? 'hyvin meni' : 'huonosti meni';
  results.target = args.target;
  return results;
};

try {
  const data = parseArray(process.argv); 
  const results = calculateExercise(data);
  console.log(results);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
