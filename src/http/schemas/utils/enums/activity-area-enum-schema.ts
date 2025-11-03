import { ActivityAreaType } from '@prisma/client'
import z from 'zod'

export const activityAreaEnumSchema = z.enum(ActivityAreaType)
