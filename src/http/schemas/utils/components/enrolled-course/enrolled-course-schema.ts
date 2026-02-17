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
  .check(({ value, issues }) => {
    if (value.startGraduationDate > value.expectedGraduationDate) {
      issues.push({
        input: value,
        code: 'custom',
        continue: true,
        message: COMPLETION_DATE_BEFORE_START_DATE,
        path: ['expectedGraduationDate'],
      })
    }

    if (value.scholarshipHolder && !value.sponsoringOrganization) {
      issues.push({
        input: value,
        code: 'custom',
        continue: true,
        message: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
        path: ['sponsoringOrganization'],
      })
    }

    if (!value.scholarshipHolder && value.sponsoringOrganization) {
      issues.push({
        input: value,
        code: 'custom',
        continue: true,
        message: SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
        path: ['scholarshipHolder'],
      })
    }
  })
