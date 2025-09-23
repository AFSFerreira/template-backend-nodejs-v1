import type { BlogWithSimplifiedDetails } from '@custom-types/blog-with-simplified-details-type'

interface HTTPSimplifiedBlog {
  id: string
  title: string
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}

export class BlogPresenter {
  static toHTTPSimplified(blog: BlogWithSimplifiedDetails): HTTPSimplifiedBlog
  static toHTTPSimplified(blogs: BlogWithSimplifiedDetails[]): HTTPSimplifiedBlog[]
  static toHTTPSimplified(
    input: BlogWithSimplifiedDetails | BlogWithSimplifiedDetails[],
  ): HTTPSimplifiedBlog | HTTPSimplifiedBlog[] {
    if (Array.isArray(input)) {
      return input.map((blog) => BlogPresenter.toHTTPSimplified(blog))
    }

    return {
      id: input.publicId,
      title: input.title,
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
