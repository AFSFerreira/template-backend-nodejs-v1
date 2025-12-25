import type { GetRestrictBlogHtmlContentParamsSchemaType } from '@custom-types/schemas/blog/get-restrict-blog-html-content-params-schema'

export interface GetRestrictBlogHTMLContentUseCaseRequest extends GetRestrictBlogHtmlContentParamsSchemaType {
  userPublicId: string
}

export interface GetRestrictBlogHTMLContentUseCaseResponse {
  htmlContent: string
}
