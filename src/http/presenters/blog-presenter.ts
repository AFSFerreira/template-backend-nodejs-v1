import type { BlogWithDetails } from '@custom-types/blog-with-details'
import type { CustomBlogWithSimplifiedDetails } from '@custom-types/custom-blog-with-simplified-details-type'

interface HTTPSimplifiedBlog {
  id: string
  title: string
  bannerImage: string
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}

interface HTTPBlog {
  id: string
  title: string
  bannerImage: string
  authorName: string
  accessCount: number
  searchContent: string
  createdAt: Date
  updatedAt: Date
  mainCategory: string
  subCategories: string[]
}

export class BlogPresenter {
  static toHTTPSimplified(blog: CustomBlogWithSimplifiedDetails): HTTPSimplifiedBlog
  static toHTTPSimplified(blogs: CustomBlogWithSimplifiedDetails[]): HTTPSimplifiedBlog[]
  static toHTTPSimplified(
    input: CustomBlogWithSimplifiedDetails | CustomBlogWithSimplifiedDetails[],
  ): HTTPSimplifiedBlog | HTTPSimplifiedBlog[] {
    if (Array.isArray(input)) {
      return input.map((blog) => BlogPresenter.toHTTPSimplified(blog))
    }

    return {
      id: input.publicId,
      title: input.title,
      bannerImage: input.bannerImage,
      searchContent: input.searchContent,
      accessCount: input.accessCount,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }

  static toHTTP(blog: BlogWithDetails): HTTPBlog
  static toHTTP(blogs: BlogWithDetails[]): HTTPBlog[]
  static toHTTP(input: BlogWithDetails | BlogWithDetails[]): HTTPBlog | HTTPBlog[] {
    if (Array.isArray(input)) {
      return input.map((blog) => BlogPresenter.toHTTP(blog))
    }

    const {
      id,
      publicId,
      content,
      titleUnaccent,
      mainBlogCategoryId,
      userId,
      MainBlogCategory,
      Subcategories,
      User,
      ...filteredBlog
    } = input

    return {
      ...filteredBlog,
      id: input.publicId,
      authorName: input.User.fullName ?? input.authorName,
      mainCategory: input.MainBlogCategory.area,
      subCategories: input.Subcategories.map((sc) => sc.area),
    }
  }
}
