import {
  NewEntry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (params: any): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { type, description, date, specialist, ...rest } = params
  switch (type as string) {
    case 'HealthCheck':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { healthCheckRating } = rest
      const healthCheckEntry: Omit<HealthCheckEntry, 'id'> = {
        type: 'HealthCheck',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        healthCheckRating: healthCheckRating
      }
      return healthCheckEntry
    case 'Hospital':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { discharge } = rest
      const hospitalEntry: Omit<HospitalEntry, 'id'> = {
        type: 'Hospital',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        discharge: discharge
      }
      return hospitalEntry
    case 'OccupationalHealthcare':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { employerName, sickLeave } = rest
      const occupationalHealthcareEntry: Omit<
        OccupationalHealthcareEntry,
        'id'
      > = {
        type: 'OccupationalHealthcare',
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        employerName: employerName,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        sickLeave: sickLeave
      }
      return occupationalHealthcareEntry
    default:
      return assertNever(params as never)
  }
}

const assertNever = (_value: never): never => {
  throw new Error('this never happened')
}

const parseSpecialist = (parseSpecialist: unknown): string => {
  if (!parseSpecialist || !isString(parseSpecialist)) {
    throw new Error('incorrect or missing specialist')
  }
  return parseSpecialist
}

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('incorrect or missing description')
  }
  return description
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('incorrect or missing date')
  }
  return date
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}
export default toNewEntry
