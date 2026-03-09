import type { FastifyReply, FastifyRequest } from 'fastify'
import { INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH } from '@constants/dynamic-file-constants'
import { electionNoticeMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { documentSchema } from '@lib/zod/utils/generic-components/document-schema'
import { UploadElectionNoticeUseCase } from '@use-cases/document-management/upload-election-notice'
import { StatusCodes } from 'http-status-codes'
import { container } from 'tsyringe'

export async function uploadElectionNotice(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(electionNoticeMultipartFileConfig)

  const { filename } = documentSchema.parse(filePart)

  const useCase = container.resolve(UploadElectionNoticeUseCase)

  await useCase.execute({ filePart, baseFolder: INSTITUTIONAL_INFO_PUBLIC_DOCUMENTS_PATH, originalFilename: filename })

  return await reply.sendResponse(undefined, StatusCodes.CREATED)
}
