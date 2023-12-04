import patientEntries from '../../data/patients'
import { ReturnPatientEntry, PatientEntry, NewPatientEntry } from '../types'
import { v1 as uuid } from 'uuid'

const getPatientEntries = (): Array<PatientEntry> => {
  return patientEntries
}

const getReturnPatientEntries = (): Array<ReturnPatientEntry> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  )
}

const addNewPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid()
  const newPatient = {
    ...entry,
    id
  }
  patientEntries.push(newPatient)
  return newPatient
}

export default {
  getPatientEntries,
  getReturnPatientEntries,
  addNewPatientEntry
}
