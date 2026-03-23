import { UserRoleType } from '@prisma/generated/enums'

export const ADMIN_PERMISSIONS_ARRAY = [UserRoleType.ADMIN] as const satisfies UserRoleType[]

export const TRIVIAL_PERMISSIONS_ARRAY = [UserRoleType.DEFAULT] as const satisfies UserRoleType[]

export const END_SIGNALS = ['SIGINT', 'SIGTERM']

export const TITLE_CASE_PORTUGUESE_EXCEPTIONS = [
  'a',
  'as',
  'o',
  'os',
  'da',
  'das',
  'de',
  'do',
  'dos',
  'na',
  'nas',
  'no',
  'nos',
  'em',
  'com',
  'por',
  'para',
  'e',
  'do',
]
