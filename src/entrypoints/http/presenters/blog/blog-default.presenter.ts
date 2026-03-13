import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { BlogDefaultPresenterInput, HTTPBlog } from '@custom-types/http/presenter/blog/blog-default'
import { BlogUrlBuilderService } from '@services/builders/urls/build-blog-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class BlogDefaultPresenter implements IPresenterStrategy<BlogDefaultPresenterInput, HTTPBlog> {
  constructor(
    @inject(BlogUrlBuilderService)
    private readonly blogUrlBuilderService: BlogUrlBuilderService,
  ) {}

  public toHTTP(input: BlogDefaultPresenterInput): HTTPBlog
  public toHTTP(input: BlogDefaultPresenterInput[]): HTTPBlog[]
  public toHTTP(input: BlogDefaultPresenterInput | BlogDefaultPresenterInput[]): HTTPBlog | HTTPBlog[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      authorName: input.authorName,
      editorialStatus: input.editorialStatus,
      title: input.title,
      bannerImage: this.blogUrlBuilderService.buildBlogBannerUrl(input.bannerImage),
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
