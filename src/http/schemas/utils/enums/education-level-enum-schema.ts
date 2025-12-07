import {
  HIGH_LEVEL_EDUCATION_TYPE_ARRAY,
  HIGH_LEVEL_STUDENT_EDUCATION_TYPE_ARRAY,
  LOW_LEVEL_EDUCATION_TYPE_ARRAY,
} from '@constants/arrays'
import { EducationLevelType } from '@prisma/client'
import z from 'zod'

export const lowLevelEducationEnumSchema = z.enum(LOW_LEVEL_EDUCATION_TYPE_ARRAY)
export const highLevelStudentEnumSchema = z.enum(HIGH_LEVEL_STUDENT_EDUCATION_TYPE_ARRAY)
export const highLevelEducationEnumSchema = z.enum(HIGH_LEVEL_EDUCATION_TYPE_ARRAY)

export const educationLevelSchema = z.enum(EducationLevelType)
