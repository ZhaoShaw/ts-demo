export enum Gender {
  Female = 'female',
  Male = 'male'
}

export interface DiagnoseEntry {
  code: string
  name: string
  latin?: string
}

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type ReturnPatientEntry = Omit<PatientEntry, 'ssn'>

export type NewPatientEntry = Omit<PatientEntry, 'id'>
