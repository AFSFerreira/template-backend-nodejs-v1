import z from 'zod'
import { enrolledCourseSchema } from '../enrolled-course/enrolled-course-schema'

export const otherRootFieldsStudentAndAcademicSchema = z.object({
  enrolledCourse: enrolledCourseSchema,
})
