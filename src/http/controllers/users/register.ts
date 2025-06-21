import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { EDUCATION_LEVEL, IDENTITY_TYPE, OCCUPATION } from '@prisma/client'
import { YEAR_MONTH_REGEX } from '@/utils/regex'

const registerBodySchema = z.object({
  email: z.string().email().min(6),
  password: z.string().min(6),
  fullName: z.string().min(5),
  username: z.string().min(5),
  birthDate: z.coerce.date(),
  lattesCVLink: z.string().url().optional(),
  profileGSLink: z.string().url().optional(),
  profileRIDLink: z.string().url().optional(),
  orcidNumber: z.coerce.string().optional(),
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
  interestDescription: z.string().max(2000),
  receiveReports: z.boolean(),
  publicInformation: z.string(),
  mainAreaActivity: z.string(),
  specificActivity: z.string(),
  specificActivityDescription: z.string().optional(),
  keywords: z.array(z.string()).max(4),

  postalCode: z.string(),
  countryName: z.string(),
  stateName: z.string(),
  cityName: z.string(),
  street: z.string(),
  houseNumber: z.string(),

  courseName: z.string().optional(),
  startGraduationDate: z
    .string()
    .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
    .transform((str) => new Date(`${str}-01T00:00:00Z`)),
  expectedGraduationDate: z
    .string()
    .regex(YEAR_MONTH_REGEX, 'Date must be in format YYYY-MM')
    .transform((str) => new Date(`${str}-01T00:00:00Z`)),
  supervisorName: z.string().optional(),
  scholarshipHolder: z.boolean(),
  sponsoringOrganization: z.string().optional(),
  academicPublications: z.array(
    z.object({
      title: z.string(),
      authors: z.string(),
      publicationDate: z.coerce.date(),
    }),
  ).max(5),
}).refine(data => {
  // Caso o usuário opte pela área de atuação "outra",
  // o campo de descrição da área deve ser preenchido e vice-versa
  if (data.mainAreaActivity === "OTHER" && data.specificActivityDescription === null) 
    return false
  
  if (data.mainAreaActivity !== "OTHER" && data.specificActivityDescription !== null)
    return false
  
  return true
}).refine(data => {
  // Se o usuário for bolsista, precisa possuir um órgão responsável e vice-versa:
  if (data.scholarshipHolder && data.sponsoringOrganization === null) 
    return false
  
  if (!data.scholarshipHolder && data.sponsoringOrganization !== null)
    return false

  return true
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
