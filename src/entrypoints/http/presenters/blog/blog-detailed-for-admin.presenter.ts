import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  BlogDetailedForAdminPresenterInput,
  HTTPBlogDetailedForAdmin,
} from '@custom-types/http/presenter/blog/blog-detailed-for-admin'
import { BlogUrlBuilderService } from '@services/builders/urls/build-blog-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class BlogDetailedForAdminPresenter
  implements IPresenterStrategy<BlogDetailedForAdminPresenterInput, HTTPBlogDetailedForAdmin>
{
  constructor(
    @inject(BlogUrlBuilderService)
    private readonly blogUrlBuilderService: BlogUrlBuilderService,
  ) {}

  public toHTTP(input: BlogDetailedForAdminPresenterInput): HTTPBlogDetailedForAdmin
  public toHTTP(input: BlogDetailedForAdminPresenterInput[]): HTTPBlogDetailedForAdmin[]
  public toHTTP(
    input: BlogDetailedForAdminPresenterInput | BlogDetailedForAdminPresenterInput[],
  ): HTTPBlogDetailedForAdmin | HTTPBlogDetailedForAdmin[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      editorialStatus: input.editorialStatus,
      title: input.title,
      accessCount: input.accessCount,
      bannerImage: this.blogUrlBuilderService.buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subcategories: input.Subcategories?.map((sc) => sc.area) ?? [],
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
