import type { EducationLevelType } from '@prisma/client'

interface EducationLevelTransformData {
  user: {
    educationLevel: EducationLevelType
  }
}
