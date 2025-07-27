import { EDUCATION_LEVEL, OCCUPATION, USER_ROLE } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetAllUsersUseCase } from '@/use-cases/factories/user/make-get-all-users-use-case'

export const getAllUsersParamsSchema = z.object({
  fullName: z.string().optional(),
  username: z.string().optional(),
  institutionName: z.string().optional(),
  departmentName: z.string().optional(),
  specificActivity: z.string().optional(),
  receiveReports: z.coerce.boolean().optional(),
  activityArea: z.string().optional(),
  keywords: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      return typeof val === 'string' ? [val] : val
    }),
  userRole: z
    .enum(Object.values(USER_ROLE) as [string, ...string[]])
    .optional(),
  occupation: z
    .enum(Object.values(OCCUPATION) as [string, ...string[]])
    .optional(),
  educationLevel: z
    .enum(Object.values(EDUCATION_LEVEL) as [string, ...string[]])
    .optional(),
  birthDateComparison: z.enum(['asc', 'desc']).optional(),
  astrobiologyOrRelatedStartYearComparison: z.enum(['asc', 'desc']).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
})

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const parsedParams = getAllUsersParamsSchema.parse(request.query)

  try {
    const getAllUsersUseCase = makeGetAllUsersUseCase()
    const { users } = await getAllUsersUseCase.execute({
      ...parsedParams,
      userRole: parsedParams.userRole as USER_ROLE,
      occupation: parsedParams.occupation as OCCUPATION,
      educationLevel: parsedParams.educationLevel as EDUCATION_LEVEL,
    })

    return await reply.status(200).send({ users })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return await reply.status(404).send({ message: error.message })
    }
  }
}
