import { EducationLevelType, UserRoleType } from '@prisma/client'

export const LOW_LEVEL_EDUCATION_TYPE_ARRAY = [
  EducationLevelType.ELEMENTARY_SCHOOL,
  EducationLevelType.HIGH_SCHOOL,
] as const

export const HIGH_LEVEL_STUDENT_EDUCATION_TYPE_ARRAY = [
  EducationLevelType.UNDERGRADUATE_STUDENT,
  EducationLevelType.MASTER_STUDENT,
  EducationLevelType.DOCTORATE_STUDENT,
] as const

export const HIGH_LEVEL_EDUCATION_TYPE_ARRAY = [
  EducationLevelType.BACHELOR,
  EducationLevelType.MASTER,
  EducationLevelType.DOCTORATE,
  EducationLevelType.POST_DOCTORATE_STUDENT,
  EducationLevelType.POST_DOCTORATE,
] as const

export const ADMIN_PERMISSIONS_ARRAY = [UserRoleType.ADMIN] as const

export const MANAGER_PERMISSIONS_ARRAY = [UserRoleType.ADMIN, UserRoleType.MANAGER] as const

export const REGULAR_PERMISSIONS_ARRAY = [UserRoleType.CONTENT_LEADER, UserRoleType.CONTENT_PRODUCER] as const

export const TRIVIAL_PERMISSIONS_ARRAY = [UserRoleType.DEFAULT] as const

export const END_SIGNALS = ['SIGINT', 'SIGTERM']

export const REDIS_STARTED_STATUS = ['ready', 'connecting']
