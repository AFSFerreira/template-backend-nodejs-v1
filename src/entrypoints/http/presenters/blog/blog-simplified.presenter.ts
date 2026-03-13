import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  BlogSimplifiedPresenterInput,
  HTTPSimplifiedBlog,
} from '@custom-types/http/presenter/blog/blog-simplified'
import { BlogUrlBuilderService } from '@services/builders/urls/build-blog-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class BlogSimplifiedPresenter implements IPresenterStrategy<BlogSimplifiedPresenterInput, HTTPSimplifiedBlog> {
  constructor(
    @inject(BlogUrlBuilderService)
    private readonly blogUrlBuilderService: BlogUrlBuilderService,
  ) {}

  public toHTTP(input: BlogSimplifiedPresenterInput): HTTPSimplifiedBlog
  public toHTTP(input: BlogSimplifiedPresenterInput[]): HTTPSimplifiedBlog[]
  public toHTTP(
    input: BlogSimplifiedPresenterInput | BlogSimplifiedPresenterInput[],
  ): HTTPSimplifiedBlog | HTTPSimplifiedBlog[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: this.blogUrlBuilderService.buildBlogBannerUrl(input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
