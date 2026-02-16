import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogDetailedPresenterInput, HTTPBlogDetailed } from '@custom-types/http/presenter/blog/blog-detailed'

export class BlogDetailedPresenter implements IPresenterStrategy<BlogDetailedPresenterInput, HTTPBlogDetailed> {
  public toHTTP(input: BlogDetailedPresenterInput): HTTPBlogDetailed {
    return {
      id: input.publicId,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: input.bannerImage,
      authorName: input.User?.fullName ?? input.authorName,
      subcategories: input.Subcategories?.map((sc) => sc.area) ?? [],
    }
  }
}
