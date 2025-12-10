import { REGULAR_PERMISSIONS_ARRAY, TRIVIAL_PERMISSIONS_ARRAY } from '@constants/arrays'
import z from 'zod'

export const nonManagerRoleEnumSchema = z.enum([...REGULAR_PERMISSIONS_ARRAY, ...TRIVIAL_PERMISSIONS_ARRAY])
