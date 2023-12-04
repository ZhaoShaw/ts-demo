import { CoursePart } from '../types'
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>GroupProjectCount {coursePart.groupProjectCount}</p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          <p>{coursePart.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h2>
            {coursePart.name} {coursePart.exerciseCount}
          </h2>
          <p>{coursePart.description}</p>
          <p>
            {' '}
            requirements{': '}
            {coursePart.requirements.map((r) => (
              <span key={r}> {r}</span>
            ))}
          </p>
        </div>
      )
    default:
      return assertNever(coursePart)
  }
}

export default Part
