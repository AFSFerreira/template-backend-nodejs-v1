import { YEAR_MONTH_REGEX } from '@/constants/regex'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/user/factories/make-register-use-case'
import { EDUCATION_LEVEL, IDENTITY_TYPE, OCCUPATION } from '@prisma/client'
import crypto from 'crypto'
import type { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { z } from 'zod'

export const registerBodySchema = z
  .object({
    user: z.object({
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
      identityType: z.enum(
        Object.values(IDENTITY_TYPE) as [string, ...string[]],
      ),
      identityDocument: z.string(),
      emailIsPublic: z.coerce.boolean(),
      astrobiologyOrRelatedStartYear: z.coerce.number(),
      interestDescription: z.string().max(2000),
      receiveReports: z.coerce.boolean(),
      publicInformation: z.string(),
      specificActivity: z.string(),
      specificActivityDescription: z.string().optional(),
    }),

    mainAreaActivity: z.string().transform((data) => data.toLocaleUpperCase()),

    keywords: z
      .array(z.string())
      .max(4)
      .transform((data) => {
        return data.map((keyword) => keyword.toUpperCase())
      }),

    address: z.object({
      postalCode: z.string(),
      country: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      street: z.string(),
      houseNumber: z.string(),
    }),

    enrolledCourse: z.object({
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
    }),

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
        data.user.specificActivityDescription === undefined
      )
        return false

      if (
        data.mainAreaActivity !== 'OTHER' &&
        data.user.specificActivityDescription !== undefined
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
      if (
        data.enrolledCourse.scholarshipHolder &&
        data.enrolledCourse.sponsoringOrganization === undefined
      )
        return false

      if (
        !data.enrolledCourse.scholarshipHolder &&
        data.enrolledCourse.sponsoringOrganization !== undefined
      )
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

  try {
    if (imageBuffer !== undefined) {
      const fileNameHash = crypto.randomBytes(10).toString('hex')
      const timestamp = Date.now()
      const finalName = `${fileNameHash}-${timestamp}.webp`

      const uploadsDir = path.resolve(
        process.cwd(),
        'uploads',
        'profile-images',
      )

      finalPath = path.join(uploadsDir, finalName)

      compressedBuffer = await sharp(imageBuffer as Buffer)
        .resize({ width: 192, height: 192 }) // 192 x 192px
        .webp({ quality: 70 })
        .toBuffer()
    }

    if (finalPath !== undefined && compressedBuffer !== undefined)
      await fs.writeFile(finalPath, compressedBuffer)

    const registerUserCase = makeRegisterUseCase()

    const { user } = await registerUserCase.execute({
      ...parsedBody,
      user: {
        ...parsedBody.user,
        profileImagePath: finalPath,
        occupation: parsedBody.user.occupation as OCCUPATION,
        educationLevel: parsedBody.user.educationLevel as EDUCATION_LEVEL,
        identityType: parsedBody.user.identityType as IDENTITY_TYPE,
      },
    })

    return await reply.status(201).send(user)
  } catch (error: unknown) {
    // Se a criação do usuário falhar depois da imagem ser persistida, removemos a imagem (rollback manual)
    if (finalPath !== undefined && compressedBuffer !== undefined) {
      try {
        await fs.unlink(finalPath)
      } catch (deleteError) {
        throw new Error('Failed to erase user profile picture.')
      }
    }

    if (error instanceof UserAlreadyExistsError) {
      return await reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
