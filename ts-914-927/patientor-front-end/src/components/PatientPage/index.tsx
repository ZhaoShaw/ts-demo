import { useState, useEffect } from 'react'
import {
  PatientEntry,
  DiagnoseItemsState,
  HospitalEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  EntryField
} from '../../types'

import { Button } from '@mui/material'
import {
  Man,
  Woman,
  Transgender,
  Star,
  StarBorder,
  StarPurple500
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../../state/state'
import { Gender, Entry } from '../../types'
import AddEntryModal from '../AddEntryModal'
import { toNewEntry } from '../../utils'
import patientService from '../../services/patients'
import { updatePatient } from '../../state/patientReducer'

const PatientPage = () => {
  const [patient, setPatient] = useState<PatientEntry | undefined>(undefined)
  const { id } = useParams<{ id: string }>()
  const { state } = useStateValue()

  useEffect(() => {
    setPatientById(id)
  })

  const setPatientById = (id: string | undefined) => {
    const p = id === undefined ? undefined : state.patients[id]
    setPatient(p)
  }

  if (patient === undefined) return null
  return (
    <div>
      <div>
        {patient.name}
        {patient.gender === Gender.Male && <Man />}
        {patient.gender === Gender.Female && <Woman />}
        {patient.gender === Gender.Other && <Transgender />}
      </div>
      <div>dateOfBirth: {patient.dateOfBirth}</div>
      <div>occupation: {patient.occupation}</div>
      {patient.entries !== undefined && patient.entries.length !== 0 && (
        <EntryComponent entries={patient.entries} diagnoses={state.diagnoses} />
      )}
    </div>
  )
}

const EntryComponent = ({
  entries,
  diagnoses
}: {
  entries: Entry[]
  diagnoses: DiagnoseItemsState
}) => {
  const { id } = useParams<{ id: string }>()
  const { dispatch } = useStateValue()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const openModal = (): void => setModalOpen(true)

  const closeModal = (): void => {
    setModalOpen(false)
    setError(undefined)
  }

  const submitNewEntry = async (values: EntryField) => {
    try {
      // console.log(values)
      const newEntry = toNewEntry(values)
      const patient = await patientService.createEntry(id as string, newEntry)
      dispatch(updatePatient(patient))
      setModalOpen(false)
    } catch (e: unknown) {
      console.error('Unknown error', e)
      setError('Unknown error')
    }
  }
  return (
    <div>
      <h2>entries</h2>
      <div>
        {entries.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} diagnoses={diagnoses} />
          </div>
        ))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  )
}

const EntryDetails = ({
  entry,
  diagnoses
}: {
  entry: Entry
  diagnoses: DiagnoseItemsState
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalElement entry={entry} diagnoses={diagnoses} />
    case 'HealthCheck':
      return <HealthCheckElement entry={entry} diagnoses={diagnoses} />
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareElement entry={entry} diagnoses={diagnoses} />
      )
    default:
      assertNever(entry)
  }
}

const assertNever = (_value: never): never => {
  throw new Error('this never happened')
}

const HospitalElement = ({
  entry,
  diagnoses
}: {
  entry: HospitalEntry
  diagnoses: DiagnoseItemsState
}) => {
  return (
    <div>
      <div>
        <Star />
        {entry.date} {entry.description}
      </div>
      {entry.diagnosisCodes !== undefined && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
      )}
      <div>
        {entry.discharge.date} {entry.discharge.criteria}
      </div>
    </div>
  )
}

const HealthCheckElement = ({
  entry,
  diagnoses
}: {
  entry: HealthCheckEntry
  diagnoses: DiagnoseItemsState
}) => {
  return (
    <div>
      <div>
        <StarBorder />
        {entry.date} {entry.description}
      </div>
      {entry.diagnosisCodes !== undefined && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
      )}
      <div>{entry.healthCheckRating}</div>
    </div>
  )
}

const OccupationalHealthcareElement = ({
  entry,
  diagnoses
}: {
  entry: OccupationalHealthcareEntry
  diagnoses: DiagnoseItemsState
}) => {
  return (
    <div>
      <div>
        <StarPurple500 />
        {entry.date} {entry.description}
      </div>
      {entry.diagnosisCodes !== undefined && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses[code].name}
            </li>
          ))}
        </ul>
      )}
      <div>{entry.employerName}</div>
    </div>
  )
}

export default PatientPage
