import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  BlogSimplifiedPresenterInput,
  HTTPSimplifiedBlog,
} from '@custom-types/http/presenter/blog/blog-simplified'

export class BlogSimplifiedPresenter implements IPresenterStrategy<BlogSimplifiedPresenterInput, HTTPSimplifiedBlog> {
  public toHTTP(input: BlogSimplifiedPresenterInput): HTTPSimplifiedBlog {
    return {
      id: input.publicId,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: input.bannerImage,
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
