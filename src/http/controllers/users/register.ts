import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'
import { EDUCATION_LEVEL, IDENTITY_TYPE, OCCUPATION } from '@prisma/client'

export const registerBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(5),
  username: z.string().min(5),
  birthDate: z.coerce.date(),
  lattesCVLink: z.string().url().optional(),
  profileGSLink: z.string().url().optional(),
  profileRIDLink: z.string().url().optional(),
  orcidNumber: z.string().optional(),
  institutionName: z.string(),
  departmentName: z.string().optional(),
  institutionComplement: z.string().optional(),
  occupation: z.enum(Object.values(OCCUPATION) as [string, ...string[]]),
  educationLevel: z.enum(
    Object.values(EDUCATION_LEVEL) as [string, ...string[]],
  ),
  identityType: z.enum(Object.values(IDENTITY_TYPE) as [string, ...string[]]),
  identityDocument: z.string(),
  emailIsPublic: z.boolean(),
  astrobiologyOrRelatedStartYear: z.number(),
  interestDescription: z.string(),
  receiveReports: z.boolean(),
  publicInformation: z.string(),
  specificActivity: z.string(),
  specificActivityDescription: z.string().optional(),
  keywords: z.array(z.string()),
  mainAreaActivity: z.string(),
  houseNumber: z.string(),
  street: z.string(),
  cityName: z.string(),
  postalCode: z.string(),
  stateName: z.string(),
  countryName: z.string(),
  courseName: z.string().optional(),
  startGraduationDate: z.coerce.date().optional(),
  expectedGraduationDate: z.coerce.date().optional(),
  supervisorName: z.string().optional(),
  scholarshipHolder: z.boolean(),
  sponsoringOrganization: z.string().optional(),
  academicPublications: z.array(
    z.object({
      title: z.string(),
      authors: z.string(),
      publicationDate: z.coerce.date(),
    }),
  ),
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body)

  try {
    const registerUserCase = makeRegisterUseCase()

    const { user } = await registerUserCase.execute({
      ...parsedBody,
      occupation: parsedBody.occupation as OCCUPATION,
      educationLevel: parsedBody.educationLevel as EDUCATION_LEVEL,
      identityType: parsedBody.identityType as IDENTITY_TYPE,
    })

    return await reply.status(201).send(user)
  } catch (err: unknown) {
    if (err instanceof UserAlreadyExistsError) {
      return await reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
