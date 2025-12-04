import { DOCUMENTS_PATH } from '@constants/file-constants'
import { statuteMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { makeUploadStatuteUseCase } from '@factories/document-management/make-upload-document-use-case'
import { documentSchema } from '@schemas/utils/generic-components/document-schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function uploadStatute(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(statuteMultipartFileConfig)

  const { filename } = documentSchema.parse(filePart)

  const useCase = makeUploadStatuteUseCase()

  await useCase.execute({ filePart, baseFolder: DOCUMENTS_PATH, originalFilename: filename })

  return await reply.status(201).send()
}
