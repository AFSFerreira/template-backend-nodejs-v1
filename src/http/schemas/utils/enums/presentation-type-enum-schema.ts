import { PresentationType } from '@prisma/client'
import z from 'zod'

export const presentationTypeEnumSchema = z.enum(PresentationType)
