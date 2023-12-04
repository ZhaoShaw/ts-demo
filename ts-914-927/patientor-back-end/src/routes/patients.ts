import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'
import toNewEntry from '../entryUtils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getReturnPatientEntries())
})

router.get('/:id', (_req, res) => {
  res.send(patientService.getPatientEntryById(_req.params.id))
})

router.post('/', (_req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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

router.post('/:id/entries', (_req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(_req.body)
    const updatePatient = patientService.addNewEntry(_req.params.id, newEntry)
    res.send(updatePatient)
  } catch (error) {
    let errMessage = 'Something went wrong'
    if (error instanceof Error) {
      errMessage += 'Error. ' + error.message
    }
    res.status(400).send(errMessage)
  }
})

export default router
