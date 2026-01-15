import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import type { Blog } from '@prisma/client'

export class BlogDefaultPresenter implements IPresenterStrategy<Blog, HTTPBlog> {
  public toHTTP(input: Blog): HTTPBlog {
    return {
      id: input.publicId,
      authorName: input.authorName,
      editorialStatus: input.editorialStatus,
      title: input.title,
      bannerImage: input.bannerImage,
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
