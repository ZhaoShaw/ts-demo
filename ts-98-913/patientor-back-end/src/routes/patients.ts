import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getReturnPatientEntries())
})

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body)
    const newPatient = patientService.addNewPatientEntry(newPatientEntry)
    res.send(newPatient)
  } catch (error) {
    let errMessage = 'Something went wrong'
    if (error instanceof Error) {
      errMessage += 'Error. ' + error.message
    }
    res.status(400).send(errMessage)
  }
})

export default router
