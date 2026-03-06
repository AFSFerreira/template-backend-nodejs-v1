import { monthYearSchema } from '@lib/zod/utils/generic-components/month-year-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import {
  COMPLETION_DATE_BEFORE_START_DATE,
  SCHOLARSHIP_HOLDER_AND_SPONSORING_ORGANIZATION,
} from '@messages/validations/user-validations'
import z from 'zod'

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
