import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  BlogDetailedWithContentPresenterInput,
  HTTPBlogDetailedWithContent,
} from '@custom-types/http/presenter/blog/blog-detailed-with-content'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { BlogUrlBuilderService } from '@services/builders/urls/build-blog-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class BlogDetailedWithContentPresenter
  implements IPresenterStrategy<BlogDetailedWithContentPresenterInput, HTTPBlogDetailedWithContent>
{
  constructor(
    @inject(BlogUrlBuilderService)
    private readonly blogUrlBuilderService: BlogUrlBuilderService,
  ) {}

  public toHTTP(input: BlogDetailedWithContentPresenterInput): HTTPBlogDetailedWithContent {
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
      content: input.content as ProseMirrorSchemaType,
    }
  }

  toHTTPList(inputs: BlogDetailedWithContentPresenterInput[]): HTTPBlogDetailedWithContent[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
