interface BodyParams {
  height: number
  weight: number
}

const parseArgs = (args: Array<string>): BodyParams => {
  if (args.length < 4) throw Error('Not enough arguments')
  if (args.length > 4) throw Error('Too many arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / (height / 100) ** 2
  let bmiDes: string = ''
  if (bmi < 18.5) bmiDes = 'Underweight'
  if (bmi >= 18.5 && bmi < 24) bmiDes = 'Normal'
  if (bmi >= 24) bmiDes = 'Overweight'
  return {
    height,
    weight,
    bmi: bmiDes
  }
}

try {
  const { height, weight } = parseArgs(process.argv)
  const res = calculateBmi(height, weight)
  console.log(res)
} catch (error) {
  let errMessage = 'Something happened.'
  if (error instanceof Error) {
    errMessage += 'Error :' + error.message
  }
  console.log(errMessage)
}
