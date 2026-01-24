import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  BlogDetailedWithContentPresenterInput,
  HTTPBlogDetailedWithContent,
} from '@custom-types/http/presenter/blog/blog-detailed-with-content'

export class BlogDetailedWithContentPresenter
  implements IPresenterStrategy<BlogDetailedWithContentPresenterInput, HTTPBlogDetailedWithContent>
{
  public toHTTP(input: BlogDetailedWithContentPresenterInput): HTTPBlogDetailedWithContent {
    return {
      id: input.publicId,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: input.bannerImage,
      authorName: input.User?.fullName ?? input.authorName,
      subCategories: input.Subcategories?.map((sc) => sc.area) ?? [],
      content: input.content,
    }
  }
}
