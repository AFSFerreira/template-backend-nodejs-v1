import { NewsletterFormatType } from '@prisma/generated/enums'
import z from 'zod'

export const newsletterFormatTypeEnumSchema = z.enum(NewsletterFormatType)
