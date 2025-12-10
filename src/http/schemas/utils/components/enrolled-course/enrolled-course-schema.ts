import {
  COMPLETION_DATE_BEFORE_START_DATE,
  SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
} from '@messages/validations/user-validations'
import z from 'zod'
import { monthYearSchema } from '../../generic-components/month-year-schema'
import { booleanSchema } from '../../primitives/boolean-schema'
import { upperCaseTextSchema } from '../../primitives/uppercase-text-schema'

export const enrolledCourseSchema = z
  .object({
    courseName: upperCaseTextSchema.optional(),
    startGraduationDate: monthYearSchema,
    expectedGraduationDate: monthYearSchema,
    supervisorName: upperCaseTextSchema.optional(),
    scholarshipHolder: booleanSchema,
    sponsoringOrganization: upperCaseTextSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.startGraduationDate > data.expectedGraduationDate) {
      ctx.addIssue({
        code: 'custom',
        message: COMPLETION_DATE_BEFORE_START_DATE,
        path: ['expectedGraduationDate'],
      })
    }

    if (data.scholarshipHolder && !data.sponsoringOrganization) {
      ctx.addIssue({
        code: 'custom',
        message: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
        path: ['sponsoringOrganization'],
      })
    }

    if (!data.scholarshipHolder && data.sponsoringOrganization) {
      ctx.addIssue({
        code: 'custom',
        message: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
        path: ['scholarshipHolder'],
      })
    }
  })
