import { Gender, NewPatientEntry } from './types'

type Fields = {
  name: unknown
  dateOfBirth: unknown
  ssn: unknown
  gender: unknown
  occupation: unknown
}
const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  }
  return newEntry
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('incorrect or missing gender')
  }
  return gender
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param)
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('incorrect or missing occupation')
  }
  return occupation
}
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('incorrect or missing ssn')
  }
  return ssn
}

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('incorrect or missing date')
  }
  return dateOfBirth
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('incorrect or missing name')
  }
  return name
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}
export default toNewPatientEntry
