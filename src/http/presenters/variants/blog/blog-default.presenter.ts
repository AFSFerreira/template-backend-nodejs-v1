import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPBlog } from '@custom-types/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import { BLOG_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_BLOG_BANNERS_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(BLOG_DEFAULT_PRESENTER_KEY)
export class BlogDefaultPresenter implements IPresenterStrategy<Blog, HTTPBlog> {
  public toHTTP(input: Blog): HTTPBlog {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.publicId,
      authorName: input.authorName,
      editorialStatus: input.editorialStatus,
      title: input.title,
      bannerImage: urlJoin(backendBaseUrl, STATIC_BLOG_BANNERS_IMAGE_ROUTE, input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
