import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPBlogDetailedWithContent } from '@custom-types/http/presenter/blog/blog-detailed-with-content'
import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export class BlogDetailedWithContentPresenter
  implements IPresenterStrategy<BlogWithDetails, HTTPBlogDetailedWithContent>
{
  public toHTTP(input: BlogWithDetails): HTTPBlogDetailedWithContent {
    const {
      id,
      publicId,
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
      content: input.content,
    }
  }
}
