import { CoursePart } from '../types'
import Part from './Part'
export const Content = ({
  courseParts
}: {
  courseParts: Array<CoursePart>
}) => {
  return (
    <div>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </div>
  )
}
