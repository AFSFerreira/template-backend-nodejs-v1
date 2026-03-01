import type Redis from 'ioredis'

export interface IGetDirectorBoardHTMLCached {
  publicId: string
  redis: Redis
}

export interface ISetDirectorBoardHTMLCache {
  publicId: string
  htmlContent: string
  redis: Redis
}

export interface IRemoveDirectorBoardHTMLCache {
  publicId: string
  redis: Redis
}
