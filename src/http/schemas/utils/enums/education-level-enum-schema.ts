import { EducationLevelType } from '@prisma/client'
import z from 'zod'

const lowLevelEducationElements = [EducationLevelType.ELEMENTARY_SCHOOL, EducationLevelType.HIGH_SCHOOL]
const highLevelStudentElements = [EducationLevelType.UNDERGRADUATE_STUDENT, EducationLevelType.MASTER_STUDENT, EducationLevelType.DOCTORATE_STUDENT]

export const lowLevelEducationEnumSchema = z.enum(lowLevelEducationElements)
export const highLevelStudentEnumSchema = z.enum(highLevelStudentElements)
export const highLevelEducationEnumSchema = z.enum(EducationLevelType).exclude(lowLevelEducationElements).exclude(highLevelStudentElements)

export const educationLevelSchema = z.enum(EducationLevelType)
