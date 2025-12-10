import type { BlogSimplifiedRaw, CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'

export function blogAdapter(customBlog: BlogSimplifiedRaw): CustomBlogWithSimplifiedDetails {
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
