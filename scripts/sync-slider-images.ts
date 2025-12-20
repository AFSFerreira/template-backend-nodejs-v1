import 'reflect-metadata'
import '@lib/tsyringe/index'
import type { SliderImagesRepository } from '@repositories/slider-images-repository'
import { SLIDER_IMAGES_PATH } from '@constants/dynamic-file-constants'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import fs from 'fs-extra'
import path from 'node:path'
import { container } from 'tsyringe'

async function syncSliderImages() {
  try {
    console.log('🔄 Sincronizando imagens do slider...')

    const sliderImagesRepository = container.resolve<SliderImagesRepository>(
      tokens.repositories.sliderImages,
    )

    // Garantir que o diretório existe
    await fs.ensureDir(SLIDER_IMAGES_PATH)

    // Listar todos os arquivos de imagem na pasta
    const filesInDirectory = await fs.readdir(SLIDER_IMAGES_PATH)
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
    const imageFiles = filesInDirectory.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return imageExtensions.includes(ext)
    })

    if (imageFiles.length === 0) {
      console.log('❌ Nenhuma imagem encontrada na pasta')
      return
    }

    console.log(`📁 Encontradas ${imageFiles.length} imagens na pasta`)

    // Buscar imagens já registradas no banco
    const existingImages = await sliderImagesRepository.findAll(false)
    const existingFilenames = new Set(existingImages.map(img => img.filename))

    // Filtrar apenas imagens não registradas
    const newImages = imageFiles.filter(filename => !existingFilenames.has(filename))

    if (newImages.length === 0) {
      console.log('✅ Todas as imagens já estão registradas no banco')
      return
    }

    console.log(`➕ Registrando ${newImages.length} novas imagens...`)

    // Obter a maior ordem atual
    let currentOrder = await sliderImagesRepository.getMaxOrder()

    // Registrar cada nova imagem
    for (const filename of newImages) {
      currentOrder++
      await sliderImagesRepository.create(filename, currentOrder)
      console.log(`  ✓ ${filename} - ordem: ${currentOrder}`)
    }

    console.log('\n🎉 Sincronização concluída com sucesso!')
    console.log(`📊 Total registrado: ${newImages.length} imagens`)
  } catch (error) {
    console.error('❌ Erro ao sincronizar imagens:', error)
    process.exit(1)
  }
}

syncSliderImages()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
