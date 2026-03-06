import z from 'zod'
import { academicPublicationsSchema } from '../academic-publication/academic-publication-schema'
import { activityAreaSchema } from '../activity-area/activity-area-schema'
import { institutionSchema } from '../institution/institution-schema'
import { keywordSchema } from '../keyword/keyword-schema'

export const otherRootFieldsProfessionalAndAcademicSchema = z.object({
  keyword: keywordSchema,
  institution: institutionSchema,
  activityArea: activityAreaSchema,
  academicPublication: academicPublicationsSchema.max(5),
})
