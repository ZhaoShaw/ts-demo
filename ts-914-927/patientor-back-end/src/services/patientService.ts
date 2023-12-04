import patientEntries from '../../data/patients'
import {
  ReturnPatientEntry,
  PatientEntry,
  NewPatientEntry,
  NewEntry
} from '../types'
import { v1 as uuid } from 'uuid'

const getPatientEntries = (): Array<PatientEntry> => {
  return patientEntries
}

const getReturnPatientEntries = (): Array<ReturnPatientEntry> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    })
  )
}

const getPatientEntryById = (id: string): PatientEntry | undefined => {
  return patientEntries.find((p) => p.id === id)
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

const addNewEntry = (patientId: string, entry: NewEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid()
  const newEntry = {
    ...entry,
    id
  }
  const patientEntry = getPatientEntryById(patientId)
  if (patientEntry === undefined) {
    throw new Error('Patient not exist')
  }
  patientEntry.entries?.push(newEntry)
  return patientEntry
}

export default {
  getPatientEntries,
  getPatientEntryById,
  getReturnPatientEntries,
  addNewPatientEntry,
  addNewEntry
}
