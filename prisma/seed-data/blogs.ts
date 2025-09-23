import type { Prisma } from '@prisma/client'
import {
  activityAreaConnection1,
  activityAreaConnection2,
  subActivityAreasConnection1,
  subActivityAreasConnection2,
} from './activity-areas'
import { userData1 } from './users'

const partialBlogData = {
  authorName: userData1.fullName,
  content: {
    type: 'doc',
    content: 'Hello, World!',
  },
  User: {
    connect: {
      username: userData1.username,
    },
  },
  MainBlogCategory: {
    connect: activityAreaConnection1,
  },
  Subcategories: {
    connect: [subActivityAreasConnection1, subActivityAreasConnection2],
  },
}

export const blogData = {
  ...partialBlogData,
  title: 'INTRODUÇÃO À ASTROBIOLOGIA',
  searchContent: 'Olá Mundo',
  MainBlogCategory: {
    connect: activityAreaConnection2,
  },
  Subcategories: {
    connect: [subActivityAreasConnection1, subActivityAreasConnection2],
  },
}

export const dummyBlogDataArray: Prisma.BlogCreateInput[] = [
  {
    ...partialBlogData,
    title: 'CORPOS CELESTES',
    searchContent: 'Sol e Estrelas',
    MainBlogCategory: {
      connect: activityAreaConnection2,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'VIDA EXTRATERRESTRE',
    searchContent: 'Busca por vida alienígena, exobiologia e organismos extremófilos',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'EXOPLANETAS E ZONAS HABITÁVEIS',
    searchContent: 'Planetas extrassolares, zona de Goldilocks e habitabilidade planetária',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'ORIGEM DA VIDA NA TERRA',
    searchContent: 'Evolução química, primeiros organismos e teorias sobre origem da vida',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'MISSÕES ESPACIAIS ASTROBIOLÓGICAS',
    searchContent: 'Mars Rover, Europa Clipper, exploração de Marte e luas de Júpiter',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'BIOSSINATURAS E DETECÇÃO DE VIDA',
    searchContent: 'Marcadores biológicos, espectroscopia e métodos de detecção remota',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'EXTREMÓFILOS E AMBIENTES EXTREMOS',
    searchContent: 'Organismos extremófilos, vida em condições adversas e analogos terrestres',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'QUÍMICA PREBIÓTICA',
    searchContent: 'Moléculas orgânicas complexas, aminoácidos no espaço e meteoritos',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'ATMOSFERAS PLANETÁRIAS E CLIMA',
    searchContent: 'Composição atmosférica, efeito estufa e evolução climática planetária',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'SETI E COMUNICAÇÃO EXTRATERRESTRE',
    searchContent: 'Search for Extraterrestrial Intelligence, radiotelescópios e sinais do espaço',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'EVOLUÇÃO ESTELAR E HABITABILIDADE',
    searchContent: 'Ciclo de vida das estrelas, anãs vermelhas e impacto na habitabilidade',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
  {
    ...partialBlogData,
    title: 'PANSPERMIA E TRANSFERÊNCIA DE VIDA',
    searchContent: 'Teoria da panspermia, meteoritos e transferência de vida entre planetas',
    MainBlogCategory: {
      connect: activityAreaConnection1,
    },
    Subcategories: {
      connect: [subActivityAreasConnection1],
    },
  },
]
