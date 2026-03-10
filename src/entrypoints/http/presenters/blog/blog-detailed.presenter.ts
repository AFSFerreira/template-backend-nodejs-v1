import type { BlogDetailedPresenterInput, HTTPBlogDetailed } from '@custom-types/http/presenter/blog/blog-detailed'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

export const BlogDetailedPresenter = {
  toHTTP(input: BlogDetailedPresenterInput): HTTPBlogDetailed {
    return {
      id: input.publicId,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subcategories: input.Subcategories?.map((sc) => sc.area) ?? [],
    }
  },

  toHTTPList(inputs: BlogDetailedPresenterInput[]): HTTPBlogDetailed[] {
    return inputs.map(this.toHTTP)
  },
}
