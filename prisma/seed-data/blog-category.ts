import { BlogCategoryType } from '@prisma/client'

export const blogMainCategoryData = {
  name: 'ASTROBIOLOGIA',
  type: BlogCategoryType.MAIN_CATEGORY,
}

export const blogSubcategoryData1 = {
  name: 'EXOBIOLOGIA',
  type: BlogCategoryType.SUBCATEGORY,
}

export const blogSubcategoryData2 = {
  name: 'GEOQUÍMICA PREBIÓTICA',
  type: BlogCategoryType.SUBCATEGORY,
}
