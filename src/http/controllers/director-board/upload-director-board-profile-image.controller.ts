import type { FastifyReply, FastifyRequest } from 'fastify'
import { directorBoardProfilePictureFileConfig } from '@constants/multipart-configuration-constants'
import { imageSchema } from '@schemas/utils/generic-components/image-schema'
import { UploadDirectorBoardProfileImageUseCase } from '@use-cases/director-board/upload-director-board-profile-image'
import { container } from 'tsyringe'

export async function uploadDirectorBoardProfileImage(request: FastifyRequest, reply: FastifyReply) {
  const filePart = await request.file(directorBoardProfilePictureFileConfig)

  imageSchema.parse(filePart)

  const useCase = container.resolve(UploadDirectorBoardProfileImageUseCase)

  const { filename, publicUrl } = await useCase.execute({ filePart })

  return await reply.status(201).send({
    data: { filename, publicUrl },
  })
}
