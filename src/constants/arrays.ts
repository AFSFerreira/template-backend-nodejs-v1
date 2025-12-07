import { EducationLevelType } from '@prisma/client'

export const LOW_LEVEL_EDUCATION_TYPE_ARRAY = [EducationLevelType.ELEMENTARY_SCHOOL, EducationLevelType.HIGH_SCHOOL]

export const HIGH_LEVEL_STUDENT_EDUCATION_TYPE_ARRAY = [
  EducationLevelType.UNDERGRADUATE_STUDENT,
  EducationLevelType.MASTER_STUDENT,
  EducationLevelType.DOCTORATE_STUDENT,
]

export const HIGH_LEVEL_EDUCATION_TYPE_ARRAY = [
  EducationLevelType.BACHELOR,
  EducationLevelType.MASTER,
  EducationLevelType.DOCTORATE,
  EducationLevelType.POST_DOCTORATE_STUDENT,
  EducationLevelType.POST_DOCTORATE,
]
