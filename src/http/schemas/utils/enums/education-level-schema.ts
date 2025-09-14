import { EducationLevelType } from '@prisma/client'
import z from 'zod'

const lowLevelEducationElements = [EducationLevelType.ELEMENTARY_SCHOOL, EducationLevelType.HIGH_SCHOOL]

export const lowLevelEducationSchema = z.enum(lowLevelEducationElements)
export const highLevelEducationSchema = z.enum(EducationLevelType).exclude(lowLevelEducationElements)

export const educationLevelSchema = z.enum(EducationLevelType)
