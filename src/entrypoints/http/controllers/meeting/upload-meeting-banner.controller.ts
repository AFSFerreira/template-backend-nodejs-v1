import type { FileInput, HTTPFile } from '@custom-types/http/presenter/file/file-default'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { meetingBannerMultipartFileConfig } from '@constants/multipart-configuration-constants'
import { FilePresenter } from '@http/presenters/file-presenter'
import { imageSchema } from '@lib/zod/utils/generic-components/image-schema'
import { UploadMeetingBannerUseCase } from '@use-cases/meeting/upload-meeting-banner'
import { container } from 'tsyringe'

export async function uploadMeetingBanner(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(meetingBannerMultipartFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadMeetingBannerUseCase)

  const uploadedFile = await useCase.execute({ filePart })

  const formattedReply = FilePresenter.toHTTP<FileInput, HTTPFile>(uploadedFile)

  return await reply.status(200).send({ data: formattedReply })
}
