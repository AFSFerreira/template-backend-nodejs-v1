import type {
  IGetBlogHTMLCached,
  IRemoveBlogHTMLCache,
  ISetBlogHTMLCache,
} from '@custom-types/services/cache/blogs-html-cache'
import { BLOG_HTML_CACHE_TTL } from '@constants/cache-constants'
import { logger } from '@lib/pino'
import { GET_BLOG_HTML_CACHED_INFO, SET_BLOG_CACHE_INFO } from '@messages/loggings/services/cache'

const generateBlogHtmlKey = (publicId: string) => `cache:blog:${publicId}:contentHtml`

/**
 * Busca o HTML de um blog no cache Redis.
 *
 * Renova o TTL automaticamente quando encontra o conteúdo em cache (sliding expiration).
 *
 * @param publicId - Identificador público do blog.
 * @param redis - Instância do cliente Redis.
 * @returns HTML cacheado ou `null` se não existir.
 */
export async function getBlogHTMLCached({ publicId, redis }: IGetBlogHTMLCached) {
  const key = generateBlogHtmlKey(publicId)
  const htmlCached: string | null = await redis.get(key)

  if (htmlCached) {
    // Reseta o TTL do cache:
    await redis.pexpire(key, BLOG_HTML_CACHE_TTL)
  }

  logger.info({ key }, GET_BLOG_HTML_CACHED_INFO)

  return htmlCached
}

/**
 * Armazena o HTML de um blog no cache Redis com TTL configurado.
 *
 * Usa `NX` (set-if-not-exists) para evitar sobrescrita. Caso já exista,
 * apenas renova o TTL sem custo de I/O de escrita.
 *
 * @param publicId - Identificador público do blog.
 * @param htmlContent - Conteúdo HTML a ser cacheado.
 * @param redis - Instância do cliente Redis.
 * @returns `'OK'` se foi cacheado pela primeira vez, ou `null` se já existia.
 */
export async function setBlogHTMLCache({ publicId, htmlContent, redis }: ISetBlogHTMLCache) {
  const key = generateBlogHtmlKey(publicId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', BLOG_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, BLOG_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_BLOG_CACHE_INFO)

  return wasCached
}

/**
 * Remove o HTML de um blog do cache Redis.
 *
 * @param publicId - Identificador público do blog.
 * @param redis - Instância do cliente Redis.
 */
export async function removeBlogHTMLCache({ publicId, redis }: IRemoveBlogHTMLCache) {
  const key = generateBlogHtmlKey(publicId)
  await redis.del(key)
}
