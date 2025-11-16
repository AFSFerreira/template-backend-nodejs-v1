import { BLOG_HTML_CACHE_TTL } from '@constants/redis-configuration-constants'
import { logger } from '@lib/logger'
import { GET_BLOG_HTML_CACHED_INFO, SET_BLOG_CACHE_INFO } from '@messages/loggings'
import type Redis from 'ioredis'

interface IGetBlogHTMLCached {
  blogId: number
  redis: Redis
}

interface ISetBlogHTMLCache {
  blogId: number
  htmlContent: string
  redis: Redis
}

const generateBlogHtmlKey = (blogId: number) => `cache:blog:${blogId}:html`

export async function getBlogHTMLCached({ blogId, redis }: IGetBlogHTMLCached) {
  const key = generateBlogHtmlKey(blogId)
  const htmlCached: string | null = await redis.get(key)

  logger.info({ key, htmlCached }, GET_BLOG_HTML_CACHED_INFO)

  return htmlCached
}

export async function setBlogHTMLCache({ blogId, htmlContent, redis }: ISetBlogHTMLCache) {
  const key = generateBlogHtmlKey(blogId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', BLOG_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, BLOG_HTML_CACHE_TTL)
  }

  logger.info({ key, wasCached }, SET_BLOG_CACHE_INFO)

  return wasCached
}
