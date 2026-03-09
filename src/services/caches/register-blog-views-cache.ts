import type { IRegisterBlogViews } from '@custom-types/services/cache/register-blog-views'
import { BLOG_IP_VIEW_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { BLOG_VISUALIZATION_CACHED } from '@messages/loggings/services/cache'

/**
 * Registra visualização de blog por IP no Redis para deduplicar contagens.
 *
 * Cada par `(blogId, IP)` recebe uma chave com TTL configurado via `BLOG_IP_VIEW_TTL`.
 * Se a chave já existir (usuário já visualizou recentemente), o `NX` impede nova escrita.
 *
 * @param blogId - Identificador do blog.
 * @param ip - Endereço IP do visitante.
 * @param redis - Instância do cliente Redis.
 * @returns `'OK'` se a visualização é nova (blog não foi visto recentemente), ou `null` se duplicada.
 */
export async function registerBlogViews({ blogId, ip, redis }: IRegisterBlogViews) {
  const key = `view:blog:${blogId}:userIp:${ip}`
  const blogWasNotRecentlyViewed: 'OK' | null = await redis.set(key, '1', 'PX', BLOG_IP_VIEW_TTL, 'NX')

  logger.info({ blogId, ip, blogWasNotRecentlyViewed }, BLOG_VISUALIZATION_CACHED)

  return blogWasNotRecentlyViewed
}
