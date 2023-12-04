export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare'
}

export interface DiagnoseEntry {
  code: string
  name: string
  latin?: string
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<DiagnoseEntry['code']>
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export interface Discharge {
  date: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeave
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn?: string
  gender: Gender
  occupation: string
  entries?: Entry[]
}

export type PatientFormValues = Omit<PatientEntry, 'id' | 'entries'>

export type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never

export type NewEntry = UnionOmit<Entry, 'id'>

export type PatientsState = {
  patients: PatientItemsState
  diagnoses: DiagnoseItemsState
}

export interface PatientItemsState {
  [id: string]: PatientEntry
}

export type PatientsAction =
  | {
      type: 'SET_PATIENT_LIST'
      payload: PatientEntry[]
    }
  | {
      type: 'ADD_PATIENT'
      payload: PatientEntry
    }
  | {
      type: 'SET_DIAGNOSE_LIST'
      payload: DiagnoseEntry[]
    }
  | {
      type: 'UPDATE_PATIENT'
      payload: PatientEntry
    }

// export type DiagnosesState = {
//   diagnoses: DiagnoseItemsState
// }

export interface DiagnoseItemsState {
  [code: string]: DiagnoseEntry
}

export type EntryField = {
  description: string
  date: string
  specialist: string
  diagnosisCodes?: string[]
  type: EntryType
  healthCheckRating?: HealthCheckRating
  dischargeDate?: string
  dischargeCriteria?: string
  employerName?: string
  sickLeaveStartDate?: string
  sickLeaveEndDate?: string
}

export enum DiagnoseCodes {
  M24_2 = 'M24.2',
  M51_2 = 'M51.2',
  S03_5 = 'S03.5',
  J10_1 = 'J10.1',
  J06_9 = 'J06.9',
  Z57_1 = 'Z57.1',
  N30_0 = 'N30.0',
  H54_7 = 'H54.7',
  J03_0 = 'J03.0',
  L60_1 = 'L60.1',
  Z74_3 = 'Z74.3',
  L20 = 'L20',
  F43_2 = 'F43.2',
  S62_5 = 'S62.5',
  H35_29 = 'H35.29',
  J12_82 = 'J12.82'
}
// export type DiagnosesAction = {
//   type: 'SET_DIAGNOSE_LIST'
//   payload: DiagnoseEntry[]
// }

// export interface SlicesState {
//   patients: PatientsState
//   diagnoses: DiagnosesState
// }

// export type AllState = PatientsState | DiagnosesState

// export type AllAction = PatientsAction | DiagnosesAction
