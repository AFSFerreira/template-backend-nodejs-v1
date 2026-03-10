import type {
  BlogDetailedWithContentPresenterInput,
  HTTPBlogDetailedWithContent,
} from '@custom-types/http/presenter/blog/blog-detailed-with-content'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'

export const BlogDetailedWithContentPresenter = {
  toHTTP(input: BlogDetailedWithContentPresenterInput): HTTPBlogDetailedWithContent {
    return {
      id: input.publicId,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      title: input.title,
      editorialStatus: input.editorialStatus,
      bannerImage: buildBlogBannerUrl(input.bannerImage),
      authorName: input.User?.fullName ?? input.authorName,
      subcategories: input.Subcategories?.map((sc) => sc.area) ?? [],
      content: input.content as ProseMirrorSchemaType,
    }
  },

  toHTTPList(inputs: BlogDetailedWithContentPresenterInput[]): HTTPBlogDetailedWithContent[] {
    return inputs.map(this.toHTTP)
  },
}
