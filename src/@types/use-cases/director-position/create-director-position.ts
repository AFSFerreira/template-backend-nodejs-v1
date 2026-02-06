import type { DirectorPosition } from '@prisma/generated/client'

export interface CreateDirectorPositionUseCaseRequest {
  position: string
  precedence: number
}

export interface CreateDirectorPositionUseCaseResponse {
  directorPosition: DirectorPosition
}
