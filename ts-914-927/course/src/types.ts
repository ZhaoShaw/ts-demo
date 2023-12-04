// new types
export interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseDescription {
  description: string
}

export interface CourseNormalPart extends CoursePartBase, CourseDescription {
  type: 'normal'
}
export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

export interface CourseSubmissionPart
  extends CoursePartBase,
    CourseDescription {
  type: 'submission'
  exerciseSubmissionLink: string
}

export interface CourseSpecialPart extends CoursePartBase, CourseDescription {
  type: 'special'
  requirements: string[]
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart
