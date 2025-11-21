import z from 'zod'
import { enrolledCourseSchema } from '../../generic-components/enrolled-course-schema'

export const otherRootFieldsStudentAndAcademicSchema = z.object({
  enrolledCourse: enrolledCourseSchema,
})
