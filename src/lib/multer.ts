import multer from 'fastify-multer'
import path from 'path'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const finalFilePath = path.resolve(
      __dirname,
      '..',
      '..',
      'uploads',
      'profile-images',
    )

    cb(null, finalFilePath)
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now()
    const extension = path.extname(file.originalname)
    const fileNameHash = crypto.randomBytes(10).toString('hex')
    const fileName = `${fileNameHash}-${timestamp}${extension}`

    cb(null, fileName)
  },
})

export const upload = multer({
  storage,
  limits: {
    // Limite de 256 Kb para cada imagem:
    fileSize: 256 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const typesAllowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (typesAllowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed.'))
    }
  },
})
