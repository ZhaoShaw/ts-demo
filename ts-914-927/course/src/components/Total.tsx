import { CoursePart } from '../types'

export const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <h2>
      Number of exercises{' '}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </h2>
  )
}
