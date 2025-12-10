export interface BlogSimplifiedRaw {
  id: number
  public_id: string
  title: string
  banner_image: string
  search_content: string
  access_count: number
  created_at: Date
  updated_at: Date
}

export interface CustomBlogWithSimplifiedDetails {
  publicId: string
  title: string
  bannerImage: string
  searchContent: string
  accessCount: number
  createdAt: Date
  updatedAt: Date
}
