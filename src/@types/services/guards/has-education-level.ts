import type { EducationLevelType } from '@prisma/client'

export type HasEducationLevel = { user: { educationLevel: EducationLevelType } }

export type HasOptionalEducationLevel = { user?: { educationLevel?: EducationLevelType } }
