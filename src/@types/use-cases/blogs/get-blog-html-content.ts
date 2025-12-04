import type { GetBlogHtmlContentParamsSchemaType } from '@custom-types/schemas/blog/get-blog-html-content-params-schema'

export interface GetBlogHTMLContentUseCaseRequest extends GetBlogHtmlContentParamsSchemaType {}

export interface GetBlogHTMLContentUseCaseResponse {
  htmlContent: string
}
