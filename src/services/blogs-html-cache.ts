import { BLOG_HTML_CACHE_TTL } from '@constants/redis-configuration-constants'
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

  return htmlCached
}

export async function setBlogHTMLCache({ blogId, htmlContent, redis }: ISetBlogHTMLCache) {
  const key = generateBlogHtmlKey(blogId)
  const wasCached: 'OK' | null = await redis.set(key, htmlContent, 'PX', BLOG_HTML_CACHE_TTL, 'NX')

  if (!wasCached) {
    // Reseta o TTL do cache sem overhead de IO de escrita:
    await redis.pexpire(key, BLOG_HTML_CACHE_TTL)
  }

  return wasCached
}
