import z from 'zod'
import { occupationEnumSchema } from '../../enums/occupation-enum-schema'
import { emailSchema } from '../../generic-components/email-schema'
import { orcidNumberSchema } from '../../generic-components/orcid-number-schema'
import { longLimitedNonemptyTextSchema } from '../../primitives/long-limited-nonempty-text-schema'
import { rangedYearSchema } from '../../primitives/ranged-year-schema'
import { upperCaseTextSchema } from '../../primitives/uppercase-text-schema'
import { urlSchema } from '../../primitives/url-schema'

export const professionalAndAcademicUserSchema = z.object({
  linkLattes: urlSchema.optional(),
  linkGoogleScholar: urlSchema.optional(),
  linkResearcherId: urlSchema.optional(),
  secondaryEmail: emailSchema.optional(),
  orcidNumber: orcidNumberSchema.optional(),
  publicInformation: longLimitedNonemptyTextSchema.optional(),
  occupation: occupationEnumSchema,
  departmentName: upperCaseTextSchema,
  astrobiologyOrRelatedStartYear: rangedYearSchema,
})
