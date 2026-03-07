import { IdentityType } from '@prisma/generated/enums'
import z from 'zod'

export const identityTypeEnumSchema = z.enum(IdentityType)
