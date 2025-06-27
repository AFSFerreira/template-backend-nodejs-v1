import { YEAR_MONTH_REGEX } from '@/constants/regex'
import { prisma } from '@/lib/prisma'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/user/factories/make-register-use-case'
import { EDUCATION_LEVEL, IDENTITY_TYPE, OCCUPATION } from '@prisma/client'
import crypto from 'crypto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { z } from 'zod'

const registerBodySchema = z
  .object({
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
    emailIsPublic: z.coerce.boolean(),
    astrobiologyOrRelatedStartYear: z.coerce.number(),
    interestDescription: z.string().max(2000),
    receiveReports: z.coerce.boolean(),
    publicInformation: z.string(),
    mainAreaActivity: z.string(),
    specificActivity: z.string(),
    specificActivityDescription: z.string().optional(),
    keywords: z.array(z.string()).max(4),

    postalCode: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
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
    scholarshipHolder: z.coerce.boolean(),
    sponsoringOrganization: z.string().optional(),
    academicPublications: z
      .array(
        z.object({
          title: z.string(),
          authors: z.string(),
          publicationDate: z.coerce.date(),
          journalName: z.string(),
          volume: z.string(),
          editionNumber: z.string(),
          pageInterval: z.string(),
          doiLink: z.string(),
        }),
      )
      .max(5),
  })
  .refine(
    (data) => {
      // Caso o usuário opte pela área de atuação "OTHER",
      // o campo de descrição da área deve ser preenchido e vice-versa
      if (
        data.mainAreaActivity === 'OTHER' &&
        data.specificActivityDescription === undefined
      )
        return false

      if (
        data.mainAreaActivity !== 'OTHER' &&
        data.specificActivityDescription !== undefined
      ) {
        return false
      }

      return true
    },
    {
      message:
        'If "Other" is selected as the main area of activity, a description must be provided — and must not be provided otherwise.',
      path: ['specificActivityDescription'],
    },
  )
  .refine(
    (data) => {
      // Se o usuário for bolsista, precisa possuir um órgão responsável e vice-versa:
      if (data.scholarshipHolder && data.sponsoringOrganization === undefined)
        return false

      if (!data.scholarshipHolder && data.sponsoringOrganization !== undefined)
        return false

      return true
    },
    {
      message:
        'If you are a scholarship holder, you must provide a sponsoring organization — and must leave it blank if you are not.',
      path: ['sponsoringOrganization'],
    },
  )

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const parsedBody = registerBodySchema.parse(request.body)

  const imageBuffer = (request as any).file?.buffer

  let finalPath: string | undefined
  let compressedBuffer: Buffer | undefined
  let userId: string | undefined

  if (imageBuffer !== undefined) {
    const fileNameHash = crypto.randomBytes(10).toString('hex')
    const timestamp = Date.now()
    const finalName = `${fileNameHash}-${timestamp}.webp`

    const uploadsDir = path.resolve(process.cwd(), 'uploads', 'profile-images')

    finalPath = path.join(uploadsDir, finalName)

    compressedBuffer = await sharp(imageBuffer as Buffer)
      .resize({ width: 192, height: 192 }) // 192 x 192px
      .webp({ quality: 70 })
      .toBuffer()
  }

  try {
    const registerUserCase = makeRegisterUseCase()

    const { user } = await registerUserCase.execute({
      ...parsedBody,
      profileImagePath: finalPath,
      occupation: parsedBody.occupation as OCCUPATION,
      educationLevel: parsedBody.educationLevel as EDUCATION_LEVEL,
      identityType: parsedBody.identityType as IDENTITY_TYPE,
    })

    userId = user.id // Salva o id para eventual rollback

    // Persiste a imagem após criar o usuário com sucesso
    if (finalPath !== undefined && compressedBuffer !== undefined)
      await fs.writeFile(finalPath, compressedBuffer)

    return await reply.status(201).send(user)
  } catch (error: unknown) {
    // Se a imagem falhar depois do user ser criado, removemos o usuário (rollback manual)
    if (userId !== undefined) {
      try {
        // HACK: Utilizando a instância do prisma diretamente para realizar a deleção,
        // substituir para o caso de uso de deleção aqui posteriormente quando estiver concluido
        await prisma.user.delete({ where: { id: userId } })
      } catch (deleteError) {
        throw new Error('Failed to save user profile picture.')
      }
    }

    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
