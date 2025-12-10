import type { regularPermissionsSchema } from '@schemas/utils/components/user/regular-permissions-schema'
import type z from 'zod'

export type RegularPermissionsType = z.infer<typeof regularPermissionsSchema>
