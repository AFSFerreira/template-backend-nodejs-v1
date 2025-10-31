import type { FastifyInstance } from 'fastify'
import { getAllDirectorBoard } from './get-all-director-board.controller'

export async function directorBoardRoutes(app: FastifyInstance) {
  app.get('/all-directors', getAllDirectorBoard)
}
