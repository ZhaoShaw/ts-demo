import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import {
  EntryField,
  EntryType,
  HealthCheckRating,
  DiagnoseCodes
} from '../../types'

import {
  Select,
  Grid,
  Button,
  MenuItem,
  InputLabel,
  Typography,
  TextField as TextFieldMUI
} from '@mui/material'

interface Props {
  onSubmit: (values: EntryField) => void
  onCancel: () => void
}

interface TextProps extends FieldProps {
  label: string
  placeholder: string
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: '1em' }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: 'red' }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
)

export type EntryTypeOption = {
  value: EntryType
  label: string
}

const entryTypeOption: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.OccupationalHealthcare, label: 'OccupationalHealthcare' }
]

export type HealthCheckRatingOption = {
  value: HealthCheckRating
  label: string
}

const healthCheckRatingOption: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' }
]

export type DiagnoseCodesOption = {
  value: DiagnoseCodes
  label: string
}

const diagnoseCodesOption: DiagnoseCodesOption[] = [
  { value: DiagnoseCodes.M24_2, label: 'M24.2' },
  { value: DiagnoseCodes.M51_2, label: 'M51.2' },
  { value: DiagnoseCodes.S03_5, label: 'S03.5' },
  { value: DiagnoseCodes.J10_1, label: 'J10.1' },
  { value: DiagnoseCodes.J06_9, label: 'J06.9' },
  { value: DiagnoseCodes.Z57_1, label: 'Z57.1' },
  { value: DiagnoseCodes.N30_0, label: 'N30.0' },
  { value: DiagnoseCodes.H54_7, label: 'H54.7' },
  { value: DiagnoseCodes.J03_0, label: 'J03.0' },
  { value: DiagnoseCodes.L60_1, label: 'L60.1' },
  { value: DiagnoseCodes.Z74_3, label: 'Z74.3' },
  { value: DiagnoseCodes.L20, label: 'L20' },
  { value: DiagnoseCodes.F43_2, label: 'F43.2' },
  { value: DiagnoseCodes.S62_5, label: 'S62.5' },
  { value: DiagnoseCodes.H35_29, label: 'H35.29' },
  { value: DiagnoseCodes.J12_82, label: 'J12.82' }
]

type SelectFieldProps = {
  name: string
  label: string
  options: HealthCheckRatingOption[] | DiagnoseCodesOption[] | EntryTypeOption[]
  multiple: boolean
}

const FormikSelect = ({ field, ...props }: FieldProps) => {
  const { multiple } = field

  if (multiple) {
    return <Select multiple {...field} {...props} />
  } else {
    return <Select {...field} {...props} />
  }
}

export const SelectField = ({
  name,
  label,
  options,
  multiple
}: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: '0.5em' }}
      label={label}
      component={FormikSelect}
      name={name}
      multiple={multiple}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
)

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const initialValues = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [DiagnoseCodes.F43_2],
    type: EntryType.HealthCheck,
    healthCheckRating: HealthCheckRating.Healthy,
    dischargeDate: '',
    dischargeCriteria: '',
    employerName: '',
    sickLeaveStartDate: '',
    sickLeaveEndDate: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        if (!values.type) {
          errors.type = requiredError
        }
        if (
          values.type === EntryType.HealthCheck &&
          !Object.values(HealthCheckRating).includes(values.healthCheckRating)
        ) {
          errors.healthCheckRating = requiredError
        }
        if (values.type === EntryType.Hospital && !values.dischargeDate) {
          errors.dischargeDate = requiredError
        }
        if (values.type === EntryType.Hospital && !values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError
        }
        if (
          values.type === EntryType.OccupationalHealthcare &&
          !values.employerName
        ) {
          errors.employerName = requiredError
        }
        return errors
      }}
    >
      {({ isValid, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <SelectField
              multiple={true}
              label="DiagnosisCodes"
              name="diagnosisCodes"
              options={diagnoseCodesOption}
            />
            <SelectField
              multiple={false}
              label="Type"
              name="type"
              options={entryTypeOption}
            />
            {values.type === EntryType.HealthCheck && (
              <div>
                <SelectField
                  multiple={false}
                  label="HealthCheckRating"
                  name="healthCheckRating"
                  options={healthCheckRatingOption}
                />
              </div>
            )}
            {values.type === EntryType.Hospital && (
              <div>
                <Field
                  label="DischargeDate"
                  placeholder="DischargeDate"
                  name="dischargeDate"
                  component={TextField}
                />
                <Field
                  label="DischargeCriteria"
                  placeholder="DischargeCriteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </div>
            )}
            {values.type === EntryType.OccupationalHealthcare && (
              <div>
                <Field
                  label="EmployerName"
                  placeholder="EmployerName"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="SickLeaveStartDate"
                  placeholder="SickLeaveStartDate"
                  name="sickLeaveStartDate"
                  component={TextField}
                />
                <Field
                  label="SickLeaveEndDate"
                  placeholder="SickLeaveEndDate"
                  name="sickLeaveEndDate"
                  component={TextField}
                />
              </div>
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: 'right' }}
                  type="submit"
                  variant="contained"
                  disabled={!isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
