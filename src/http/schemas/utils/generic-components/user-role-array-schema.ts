import z from 'zod'
import { userRoleEnumSchema } from '../enums/user-role-enum-schema'

export const userRoleArraySchema = z.array(userRoleEnumSchema)
