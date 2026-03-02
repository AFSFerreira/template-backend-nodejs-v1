import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'

export class BlogDefaultPresenter implements IPresenterStrategy<BlogDefaultPresenterInput, HTTPBlog> {
  public toHTTP(input: BlogDefaultPresenterInput): HTTPBlog {
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
