import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogDetailedPresenterInput, HTTPBlogDetailed } from '@custom-types/http/presenter/blog/blog-detailed'

export class BlogDetailedPresenter implements IPresenterStrategy<BlogDetailedPresenterInput, HTTPBlogDetailed> {
  public toHTTP(input: BlogDetailedPresenterInput): HTTPBlogDetailed {
    const {
      id,
      publicId,
      content,
      titleUnaccent,
      userId,
      searchContent,
      Subcategories,
      User,
      editorialStatus,
      ...filteredBlog
    } = input

    return {
      ...filteredBlog,
      id: input.publicId,
      editorialStatus: input.editorialStatus,
      bannerImage: input.bannerImage,
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area) ?? [],
    }
  }
}
