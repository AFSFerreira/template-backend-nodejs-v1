import { profileImageExtensions } from '@constants/profile-image-extensions'
import multer from 'fastify-multer'
// import path from 'path'
// import crypto from 'crypto'

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const finalFilePath = path.resolve(
//       __dirname,
//       '..',
//       '..',
//       'uploads',
//       'profile-images',
//     )

//     cb(null, finalFilePath)
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now()
//     const extension = path.extname(file.originalname)
//     const fileNameHash = crypto.randomBytes(10).toString('hex')
//     const fileName = `${fileNameHash}-${timestamp}${extension}`

//     cb(null, fileName)
//   },
// })

const MAX_FILE_SIZE_MB = 2
const BYTES_IN_MB = 1024 * 1024

export const upload = multer({
  storage: multer.memoryStorage(), // Armazena a imagem na memória RAM para comprimi-la
  limits: {
    fileSize: MAX_FILE_SIZE_MB * BYTES_IN_MB, // 2Mb
  },
  fileFilter: (_req, file, cb) => {
    const typesAllowed = profileImageExtensions.map(
      (extension) => `image/${extension}`,
    )
    if (typesAllowed.includes(file.mimetype)) cb(null, true)
    else cb(new Error('Only image files are allowed.'))
  },
})
