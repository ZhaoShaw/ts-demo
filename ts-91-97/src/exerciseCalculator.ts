interface ExercisesRes {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export interface inputParams {
  target: number
  dailyArr: number[]
}

const parseArgs = (args: Array<string>): inputParams => {
  if (args.length < 4) throw Error('Not enough arguments')
  if (args.length > 50) throw Error('Too many arguments')
  const [target, ...dailyArr] = args
    .filter((_arg, index) => index > 1)
    .map((arg) => {
      if (!isNaN(Number(arg))) return Number(arg)
      else throw new Error('Provided values were not numbers!')
    })
  return {
    target,
    dailyArr
  }
}

export const calculateExercises = (
  target: number,
  dailyArr: number[]
): ExercisesRes => {
  const periodLength = dailyArr.length
  const trainingDays = dailyArr.filter((d) => d !== 0).length
  const totalHours = dailyArr.reduce((prev, cur) => prev + cur)
  const average = totalHours / periodLength
  const success = average >= target ? true : false
  let rating = 0
  let ratingDescription = 'default'
  if (average < 1) {
    rating = 1
    ratingDescription = 'could be better'
  }

  if (average >= 1 && average < 2) {
    rating = 2
    ratingDescription = 'good'
  }

  if (average >= 2) {
    rating = 3
    ratingDescription = 'excellent'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { target, dailyArr } = parseArgs(process.argv)
  const res = calculateExercises(target, dailyArr)
  console.log(res)
} catch (error) {
  let errMessage = 'Something happened.'
  if (error instanceof Error) {
    errMessage += 'Error :' + error.message
  }
  console.log(errMessage)
}
