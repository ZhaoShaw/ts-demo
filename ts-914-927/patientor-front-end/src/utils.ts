import {
  NewEntry,
  EntryField,
  EntryType,
  HealthCheckRating,
  HealthCheckEntry,
  HospitalEntry,
  Discharge,
  OccupationalHealthcareEntry,
  SickLeave
} from './types'

export const toNewEntry = (values: EntryField): NewEntry => {
  switch (values.type) {
    case EntryType.HealthCheck:
      return {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        type: EntryType.HealthCheck,
        healthCheckRating: values.healthCheckRating as HealthCheckRating
      } as Omit<HealthCheckEntry, 'id'>
    case EntryType.Hospital:
      const discharge: Discharge = {
        date: values.dischargeDate as string,
        criteria: values.dischargeCriteria as string
      }
      return {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        type: EntryType.Hospital,
        discharge: discharge
      } as Omit<HospitalEntry, 'id'>
    case EntryType.OccupationalHealthcare:
      const sickLeave: SickLeave = {
        startDate: values.sickLeaveStartDate as string,
        endDate: values.sickLeaveEndDate as string
      }
      return {
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        type: EntryType.OccupationalHealthcare,
        employerName: values.employerName,
        sickLeave: sickLeave
      } as Omit<OccupationalHealthcareEntry, 'id'>
  }
}

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}
