import { ActivityAreaType } from '@prisma/client'
import z from 'zod'

export const activityAreaSchema = z.enum(ActivityAreaType)
