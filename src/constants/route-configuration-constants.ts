import { UserRoleType } from '@prisma/client'

export const MANAGER_PERMISSIONS = new Set([UserRoleType.ADMIN, UserRoleType.MANAGER])
