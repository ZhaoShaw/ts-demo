import { useEffect } from 'react'
import axios from 'axios'
import { Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Container, Typography } from '@mui/material'

import { apiBaseUrl } from './constants'

import patientService from './services/patients'
import diagnoseService from './services/diagnoses'
import PatientListPage from './components/PatientListPage'
import PatientPage from './components/PatientPage'

import { useStateValue } from './state/state'
import { setPatientList, setDiagnoseList } from './state/patientReducer'

const App = () => {
  const { dispatch } = useStateValue()

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchPatientList = async () => {
      const patients = await patientService.getAll()
      dispatch(setPatientList(patients))
    }

    const fetchDiagnoseList = async () => {
      const diagnoses = await diagnoseService.getAll()
      dispatch(setDiagnoseList(diagnoses))
    }

    void fetchPatientList()
    fetchDiagnoseList()
  }, [])

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/patients">
            <Route path=":id" element={<PatientPage />} />
          </Route>
          <Route path="/" element={<PatientListPage />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
