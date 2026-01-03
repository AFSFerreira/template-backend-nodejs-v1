import { INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { statuteMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@schemas/utils/generic-components/document-schema'
import { UploadStatuteUseCase } from '@use-cases/document-management/upload-statute'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

export async function uploadStatute(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(statuteMultipartFileConfig)

  const { filename } = documentSchema.parse(filePart)

  const useCase = container.resolve(UploadStatuteUseCase)

  await useCase.execute({ filePart, baseFolder: INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH, originalFilename: filename })

  return await reply.status(201).send()
}
