import { BLOG_DETAILED_PRESENTER_KEY } from '@constants/presenters-constants'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPBlogDetailed } from '@custom-types/presenter/blog/blog-detailed'
import type { BlogWithDetails } from '@custom-types/validator/blog-with-details'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(BLOG_DETAILED_PRESENTER_KEY)
export class BlogDetailedPresenter implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailed> {
  public toHTTP(input: BlogWithDetails): HTTPBlogDetailed {
    const { id, publicId, content, titleUnaccent, userId, searchContent, Subcategories, User, ...filteredBlog } = input

    return {
      ...filteredBlog,
      id: input.publicId,
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area),
    }
  }
}
