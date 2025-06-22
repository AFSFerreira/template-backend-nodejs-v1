import 'fastify'

export interface MulterFile {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  filename: string
  path: string
  size: number
  buffer?: Buffer
}

declare module 'fastify' {
  interface FastifyRequest {
    file?: MulterFile
    files?: MulterFile[]
  }
}
