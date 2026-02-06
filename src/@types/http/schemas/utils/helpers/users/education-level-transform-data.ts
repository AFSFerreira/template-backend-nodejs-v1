import type { EducationLevelType } from '@prisma/generated/enums'

export interface EducationLevelTransformData {
  user: {
    educationLevel: EducationLevelType
  }
}
