import { EditorialStatusType, EducationLevelType, UserRoleType } from '@prisma/client'

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

export const NOT_APPROVED_EDITORIAL_STATUS_ARRAY = [
  EditorialStatusType.DRAFT,
  EditorialStatusType.PENDING_APPROVAL,
] as const

export const PENDING_APPROVAL_OR_PUBLISHED_ARRAY = [
  EditorialStatusType.PENDING_APPROVAL,
  EditorialStatusType.PUBLISHED,
] as const

export const DRAFT_OR_CHANGES_REQUESTED_ARRAY = [
  EditorialStatusType.DRAFT,
  EditorialStatusType.CHANGES_REQUESTED,
] as const

export const DRAFT_OR_PENDING_OR_CHANGES_REQUESTED_ARRAY = [
  EditorialStatusType.DRAFT,
  EditorialStatusType.CHANGES_REQUESTED,
  EditorialStatusType.PENDING_APPROVAL,
] as const

export const ADMIN_PERMISSIONS_ARRAY = [UserRoleType.ADMIN] as const

export const MANAGER_PERMISSIONS_ARRAY = [...ADMIN_PERMISSIONS_ARRAY, UserRoleType.MANAGER] as const

export const CONTENT_LEADER_PERMISSIONS_ARRAY = [...MANAGER_PERMISSIONS_ARRAY, UserRoleType.CONTENT_LEADER] as const

export const CONTENT_PRODUCERS_PERMISSIONS_ARRAY = [
  ...CONTENT_LEADER_PERMISSIONS_ARRAY,
  UserRoleType.CONTENT_PRODUCER,
] as const

export const TRIVIAL_PERMISSIONS_ARRAY = [UserRoleType.DEFAULT] as const

export const END_SIGNALS = ['SIGINT', 'SIGTERM']

export const ASPECT_RATIOS = ['1:1', '3:2', '4:3', '21:9', '9:16', '16:9'] as const

export const QUALITY_VALUES = ['nHD', 'HD', 'FULL_HD', 'QUAD_HD', 'UHD', '8K_UHD'] as const
