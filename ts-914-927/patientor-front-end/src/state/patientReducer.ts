import {
  PatientsState,
  PatientsAction,
  PatientEntry,
  DiagnoseEntry
} from '../types'

export const initialState: PatientsState = { patients: {}, diagnoses: {} }

export default (
  state: PatientsState,
  action: PatientsAction
): PatientsState => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }
    case 'SET_DIAGNOSE_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses
        }
      }
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      }
    default:
      return state
  }
}

export const setPatientList = (patients: PatientEntry[]): PatientsAction => {
  return { type: 'SET_PATIENT_LIST', payload: patients }
}

export const addPatient = (patient: PatientEntry): PatientsAction => {
  return { type: 'ADD_PATIENT', payload: patient }
}

export const setDiagnoseList = (diagnoses: DiagnoseEntry[]): PatientsAction => {
  return { type: 'SET_DIAGNOSE_LIST', payload: diagnoses }
}

export const updatePatient = (patient: PatientEntry): PatientsAction => {
  return { type: 'UPDATE_PATIENT', payload: patient }
}
