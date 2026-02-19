import { OccupationType } from '@prisma/generated/enums'
import z from 'zod'

export const occupationEnumSchema = z.enum(OccupationType)
