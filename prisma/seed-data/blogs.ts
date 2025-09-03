import {
  blogMainCategoryData,
  blogSubcategoryData1,
  blogSubcategoryData2,
} from './blog-category'
import { userData1 } from './users'

export const partialBlogData = {
  title: 'INTRODUÇÃO À ASTROBIOLOGIA',
  authorName: userData1.fullName,
  htmlContent: '<h1>HELLO WORLD</h1>',
}

export const blogData = {
  ...partialBlogData,
  User: {
    connect: {
      username: userData1.username,
    },
  },
  MainBlogCategory: {
    connectOrCreate: {
      where: { type_name: blogMainCategoryData },
      create: blogMainCategoryData,
    },
  },
  Subcategories: {
    connectOrCreate: [blogSubcategoryData1, blogSubcategoryData2].map(
      (categoryData) => ({
        where: { type_name: categoryData },
        create: categoryData,
      }),
    ),
  },
}
