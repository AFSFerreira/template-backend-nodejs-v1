import type {
  BlogSimplifiedPresenterInput,
  HTTPSimplifiedBlog,
} from '@custom-types/http/presenter/blog/blog-simplified'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

export const BlogSimplifiedPresenter = {
  toHTTP(input: BlogSimplifiedPresenterInput): HTTPSimplifiedBlog {
    return {
      id: input.publicId,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  },

  toHTTPList(inputs: BlogSimplifiedPresenterInput[]): HTTPSimplifiedBlog[] {
    return inputs.map(this.toHTTP)
  },
}
