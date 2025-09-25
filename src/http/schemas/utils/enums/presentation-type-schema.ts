import { PresentationType } from '@prisma/client'
import z from 'zod'

export const presentationTypeSchema = z.enum(PresentationType)
