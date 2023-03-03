export interface BmiValues {
  height: number
  weight: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) throw new Error("Can't divide by 0!")
  const heightInMeters = height / 100
  const bmi = weight / Math.pow(heightInMeters, heightInMeters)
  console.log(bmi)
  if (bmi < 16) {
    return 'severe thinness'
  } else if (bmi > 16 && bmi < 17) {
    return 'moderate thinness'
  } else if (bmi > 17 && bmi < 18.4) {
    return 'mild thinness'
  } else if (bmi > 18.5 && bmi < 24.9) {
    return 'normal weight'
  } else {
    return 'overweight'
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  const bmi = calculateBmi(height, weight)
  console.log(bmi)
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
