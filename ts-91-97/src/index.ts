import express from 'express'
// import bodyParser from 'body-parser'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'
const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (_req, res) => {
  try {
    if (isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight))) {
      throw new Error('malformatted parameters')
    }
    const result = calculateBmi(
      Number(_req.query.height),
      Number(_req.query.weight)
    )
    res.json(result)
  } catch (error) {
    if (error instanceof Error) {
      res.send({ error: error.message })
    } else {
      res.status(404)
    }
  }
})

app.post('/exercise', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, dailyArr } = _req.body

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!target || !dailyArr || dailyArr.length === 0) {
    return res.send({ error: 'parameters missing' }).status(400)
  }

  if (isNaN(Number(target))) {
    return res.send({ error: 'malformatted parameters' }).status(400)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const flag = dailyArr.every((element: any) => {
    if (!isNaN(Number(element))) {
      return true
    } else {
      return false
    }
  })

  if (!flag) {
    res.send({ error: 'malformatted parameters' }).status(400)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, dailyArr)
  return res.json(result)
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
