import type { BlogDetailedRaw, CustomBlogDetailed } from '@custom-types/adapter/blog-detailed'

export function blogDetailedAdapter(customBlog: BlogDetailedRaw): CustomBlogDetailed {
  return {
    publicId: customBlog.public_id,
    title: customBlog.title,
    bannerImage: customBlog.banner_image,
    authorName: customBlog.author_name,
    editorialStatus: customBlog.editorial_status,
    accessCount: customBlog.access_count,
    searchContent: customBlog.search_content,
    createdAt: customBlog.created_at,
    updatedAt: customBlog.updated_at,
    User: customBlog.user_full_name
      ? {
          fullName: customBlog.user_full_name,
        }
      : null,
    Subcategories: customBlog.subcategories.map((subcategory) => ({
      id: subcategory.id,
      area: subcategory.area,
    })),
  }
}
