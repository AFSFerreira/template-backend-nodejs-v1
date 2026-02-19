import { ActivityAreaType } from '@prisma/generated/enums'
import z from 'zod'

export const activityAreaEnumSchema = z.enum(ActivityAreaType)
