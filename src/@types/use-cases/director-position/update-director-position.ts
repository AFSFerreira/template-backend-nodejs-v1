import type { UpdateDirectorPositionBodySchemaType } from '@custom-types/http/schemas/director-position/update-director-position-body-schema'
import type { DirectorPosition } from '@prisma/generated/client'

export interface UpdateDirectorPositionUseCaseRequest {
  publicId: string
  data: UpdateDirectorPositionBodySchemaType
}

export interface UpdateDirectorPositionUseCaseResponse {
  directorPosition: DirectorPosition
}
