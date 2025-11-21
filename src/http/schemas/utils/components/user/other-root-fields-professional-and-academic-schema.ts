import z from 'zod'
import { academicPublicationsSchema } from '../../generic-components/academic-publication-schema'
import { activityAreaSchema } from '../../generic-components/activity-area-schema'
import { institutionSchema } from '../../generic-components/institution-schema'
import { keywordSchema } from '../../generic-components/keyword-schema'

export const otherRootFieldsProfessionalAndAcademicSchema = z.object({
  keyword: keywordSchema,
  institution: institutionSchema,
  activityArea: activityAreaSchema,
  academicPublication: academicPublicationsSchema.max(5),
})
