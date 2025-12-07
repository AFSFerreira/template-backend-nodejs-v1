import { BLOG_HTML_CACHE_TTL } from '@constants/timing-constants'
import type { IGetBlogHTMLCached, ISetBlogHTMLCache } from '@custom-types/services/blogs-html-cache'
import { logger } from '@lib/logger'
import { GET_BLOG_HTML_CACHED_INFO, SET_BLOG_CACHE_INFO } from '@messages/loggings'

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
