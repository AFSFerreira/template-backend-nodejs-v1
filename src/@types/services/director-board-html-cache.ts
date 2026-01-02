import type Redis from 'ioredis'

export interface IGetDirectorBoardHTMLCached {
  directorBoardId: number
  redis: Redis
}

export interface ISetDirectorBoardHTMLCache {
  directorBoardId: number
  htmlContent: string
  redis: Redis
}

export interface IRemoveDirectorBoardHTMLCache {
  directorBoardId: number
  redis: Redis
}
