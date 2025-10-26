import type { BlogRaw } from '@custom-types/blog-raw-type'
import type { CustomBlogWithSimplifiedDetails } from '@custom-types/custom-blog-with-simplified-details-type'

export function blogAdapter(customBlog: BlogRaw): CustomBlogWithSimplifiedDetails {
  return {
    publicId: customBlog.public_id,
    title: customBlog.title,
    bannerImage: customBlog.banner_image,
    accessCount: customBlog.access_count,
    searchContent: customBlog.search_content,
    createdAt: customBlog.created_at,
    updatedAt: customBlog.updated_at,
  }
}
