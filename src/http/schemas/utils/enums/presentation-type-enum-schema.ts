import { PresentationType } from '@prisma/generated/enums'
import z from 'zod'

export const presentationTypeEnumSchema = z.enum(PresentationType)
