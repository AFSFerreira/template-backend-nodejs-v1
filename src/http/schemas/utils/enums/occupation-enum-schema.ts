import { OccupationType } from '@prisma/client'
import z from 'zod'

export const occupationEnumSchema = z.enum(OccupationType)
