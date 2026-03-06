import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { orcidNumberSchema } from '@lib/zod/utils/generic-components/orcid-number-schema'
import { longLimitedNonemptyTextSchema } from '@lib/zod/utils/primitives/long-limited-nonempty-text-schema'
import { rangedYearSchema } from '@lib/zod/utils/primitives/ranged-year-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import { urlSchema } from '@lib/zod/utils/primitives/url-schema'
import z from 'zod'

export const professionalAndAcademicUserSchema = z.object({
  linkLattes: urlSchema.optional(),
  linkGoogleScholar: urlSchema.optional(),
  linkResearcherId: urlSchema.optional(),
  orcidNumber: orcidNumberSchema.optional(),
  publicInformation: longLimitedNonemptyTextSchema.optional(),
  occupation: occupationEnumSchema,
  departmentName: upperCaseTextSchema,
  astrobiologyOrRelatedStartYear: rangedYearSchema,
})
