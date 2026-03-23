import type Redis from 'ioredis'

export interface IGetDirectorBoardHTMLCached {
  id: string
  redis: Redis
}

export interface ISetDirectorBoardHTMLCache {
  id: string
  htmlContent: string
  redis: Redis
}

export interface IRemoveDirectorBoardHTMLCache {
  id: string
  redis: Redis
}
