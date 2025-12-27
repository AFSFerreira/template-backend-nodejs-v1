import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPBlog } from '@custom-types/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'
import { BLOG_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildBlogBannerUrl } from '@services/http/url/build-blog-banner-url'

@RegisterPresenter(BLOG_DEFAULT_PRESENTER_KEY)
export class BlogDefaultPresenter implements IPresenterStrategy<Blog, HTTPBlog> {
  public toHTTP(input: Blog): HTTPBlog {
    return {
      id: input.publicId,
      authorName: input.authorName,
      editorialStatus: input.editorialStatus,
      title: input.title,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
