import { PrismaDirectorBoardRepository } from '@repositories/prisma/prisma-director-board-repository'
import { GetAllDirectorsBoard } from '@use-cases/director-board/get-all-directors-board'

export function makeGetAllDirectorBoardUseCase() {
  const directorBoardRepository = new PrismaDirectorBoardRepository()
  const directorBoardUseCase = new GetAllDirectorsBoard(directorBoardRepository)

  return directorBoardUseCase
}
