import type { BlogWithSimplifiedDetails } from '@custom-types/blog-with-simplified-details-type'
import type { CustomBlogRaw } from '@custom-types/custom-blog-raw-type'

export function customBlogAdapter(customBlog: CustomBlogRaw): BlogWithSimplifiedDetails {
  return {
    publicId: customBlog.public_id,
    title: customBlog.title,
    accessCount: customBlog.access_count,
    searchContent: customBlog.search_content,
    createdAt: customBlog.created_at,
    updatedAt: customBlog.updated_at,
  }
}
