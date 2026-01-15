import type { EducationLevelType } from '@prisma/client'

export interface EducationLevelTransformData {
  user: {
    educationLevel: EducationLevelType
  }
}
