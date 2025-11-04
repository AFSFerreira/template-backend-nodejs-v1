import path from "node:path"
import { BASE_PROJECT_PATH } from "@constants/file-constants"
import fastifyStatic from "@fastify/static"
import type { FastifyInstance } from "fastify"

export async function staticFileRoutes(app: FastifyInstance) {
  const staticRouteConfigurations = {
    root: path.resolve(BASE_PROJECT_PATH, 'uploads', 'user', 'profile-images'),
    decorateReply: false,
    serveDotFiles: false,
    cacheControl: true,
    immutable: true,
    maxAge: '1y',

    // setHeaders: (response: SetHeadersResponse, _pathName: string) => {
    //   response.setHeader('Cache-Control', `public, max-age=${ms('1y')}, immutable`)
    // },
  }

  const fileRoutes = ['/users/profile-images/', '/meetings/banners/']

  for (const fileRoute of fileRoutes) {
    app.register(fastifyStatic, {
      ...staticRouteConfigurations,
      prefix: fileRoute,
    })
  }
}
