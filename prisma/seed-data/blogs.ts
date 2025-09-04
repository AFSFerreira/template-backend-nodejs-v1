import {
  activityAreaConnection,
  subActivityAreasConnection1,
  subActivityAreasConnection2,
} from './activity-areas'
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
    connect: {
      ...activityAreaConnection,
    },
  },
  Subcategories: {
    connect: [subActivityAreasConnection1, subActivityAreasConnection2],
  },
}
