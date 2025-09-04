import { OccupationType } from '@prisma/client'
import z from 'zod'

export const occupationSchema = z.enum(OccupationType)
