import type { DirectorPosition } from '@prisma/client'

export interface CreateDirectorPositionUseCaseRequest {
  position: string
  precedence: number
}

export interface CreateDirectorPositionUseCaseResponse {
  directorPosition: DirectorPosition
}
