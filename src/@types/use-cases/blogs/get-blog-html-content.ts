import type { GetBlogHtmlContentParamsSchemaType } from '@custom-types/http/schemas/blog/get-blog-html-content-params-schema'

export interface GetBlogHTMLContentUseCaseRequest extends GetBlogHtmlContentParamsSchemaType {}

export interface GetBlogHTMLContentUseCaseResponse {
  htmlContent: string
}
