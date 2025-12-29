import fs from 'node:fs'
import path from 'node:path'
import {
  PRESENTERS_AUTO_GENERATED_WARNING,
  PRESENTERS_GLOB_PATTERN,
  PRESENTERS_OUTPUT_FILE,
  PRESENTERS_REGENERATE_COMMAND,
} from '@constants/static-file-constants'
import glob from 'fast-glob'
import slash from 'slash'

const files = glob.globSync(slash(PRESENTERS_GLOB_PATTERN))

const imports = files
  .map((file) => {
    const outputDir = path.dirname(path.resolve(PRESENTERS_OUTPUT_FILE))

    const absoluteFile = path.resolve(file)
    const relativePath = path.relative(outputDir, absoluteFile).replace(/\.ts$/, '')

    const finalPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`

    return `import '${slash(finalPath)}'`
  })
  .join('\n')

const content = `${PRESENTERS_AUTO_GENERATED_WARNING}\n\n${PRESENTERS_REGENERATE_COMMAND}\n\n${imports}\n`

fs.writeFileSync(PRESENTERS_OUTPUT_FILE, content)
