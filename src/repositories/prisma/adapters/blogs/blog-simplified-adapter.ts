import type {
  BlogSimplifiedRaw,
  CustomBlogWithSimplifiedDetails,
} from '@custom-types/repository/prisma/adapter/blog-simplified'

export function blogSimplifiedAdapter(customBlog: BlogSimplifiedRaw): CustomBlogWithSimplifiedDetails {
  return {
    publicId: customBlog.public_id,
    title: customBlog.title,
    editorialStatus: customBlog.editorial_status,
    bannerImage: customBlog.banner_image,
    accessCount: customBlog.access_count,
    searchContent: customBlog.search_content,
    createdAt: customBlog.created_at,
    updatedAt: customBlog.updated_at,
  }
}
