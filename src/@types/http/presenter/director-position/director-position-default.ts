import type { DirectorPosition } from '@prisma/generated/client'

export interface DirectorPositionDefaultPresenterInput extends DirectorPosition {}

export interface HTTPDirectorPosition {
  id: string
  position: string
  precedence: number
  description: string | null
}
