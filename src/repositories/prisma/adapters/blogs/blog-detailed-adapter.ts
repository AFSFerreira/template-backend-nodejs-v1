import type { BlogDetailedRaw, CustomBlogDetailed } from '@custom-types/adapter/blog-detailed'

export function blogDetailedAdapter(customBlog: BlogDetailedRaw): CustomBlogDetailed {
  return {
    publicId: customBlog.public_id,
    title: customBlog.title,
    bannerImage: customBlog.banner_image,
    editorialStatus: customBlog.editorial_status,
    accessCount: customBlog.access_count,
    searchContent: customBlog.search_content,
    createdAt: customBlog.created_at,
    updatedAt: customBlog.updated_at,
  }
}
