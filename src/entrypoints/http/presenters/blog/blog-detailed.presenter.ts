import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogDetailedPresenterInput, HTTPBlogDetailed } from '@custom-types/http/presenter/blog/blog-detailed'
import { BlogUrlBuilderService } from '@services/builders/urls/build-blog-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class BlogDetailedPresenter implements IPresenterStrategy<BlogDetailedPresenterInput, HTTPBlogDetailed> {
  constructor(
    @inject(BlogUrlBuilderService)
    private readonly blogUrlBuilderService: BlogUrlBuilderService,
  ) {}

  public toHTTP(input: BlogDetailedPresenterInput): HTTPBlogDetailed {
    return {
      id: input.publicId,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: this.blogUrlBuilderService.buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subcategories: input.Subcategories?.map((sc) => sc.area) ?? [],
    }
  }

  toHTTPList(inputs: BlogDetailedPresenterInput[]): HTTPBlogDetailed[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
