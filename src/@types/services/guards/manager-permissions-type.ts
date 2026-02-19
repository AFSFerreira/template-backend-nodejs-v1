import type { managerPermissionsSchema } from '@lib/zod/utils/components/user/manager-permissions-schema'
import type z from 'zod'

export type ManagerPermissionsType = z.infer<typeof managerPermissionsSchema>
