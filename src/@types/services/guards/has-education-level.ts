import type { EducationLevelType } from '@prisma/generated/enums'

export type HasEducationLevel = { user: { educationLevel: EducationLevelType } }

export type HasOptionalEducationLevel = { user?: { educationLevel?: EducationLevelType } }
