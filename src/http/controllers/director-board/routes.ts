import type { FastifyInstance } from 'fastify'
import { getAllDirectorsBoard } from './get-all-director-board.controller'

export async function directorBoardRoutes(app: FastifyInstance) {
  app.get('/', getAllDirectorsBoard)
}
