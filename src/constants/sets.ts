import type { UserRoleType } from '@prisma/generated/enums'
import { ADMIN_PERMISSIONS_ARRAY } from './arrays'

export const SENSITIVE_KEYS = new Set<string>([
  'password',
  'passwordHash',
  'identityDocument',
  'token',
  'cpf',
  'rg',
  'secret',
])

export const ADMIN_PERMISSIONS = new Set<UserRoleType>(ADMIN_PERMISSIONS_ARRAY)
