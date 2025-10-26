import { PrismaDirectorBoardRepository } from '@repositories/prisma/prisma-director-board-repository'
import { GetAllDirectiveCorpUseCase } from '@use-cases/director-board/get-all-directors-board'

export function makeGetAllDirectorBoardUseCase() {
  const directorBoardRepository = new PrismaDirectorBoardRepository()
  const directorBoardUseCase = new GetAllDirectiveCorpUseCase(directorBoardRepository)

  return directorBoardUseCase
}
