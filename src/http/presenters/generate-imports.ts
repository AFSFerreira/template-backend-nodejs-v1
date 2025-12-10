import fs from 'node:fs'
import path from 'node:path'
import {
  PRESENTERS_AUTO_GENERATED_WARNING,
  PRESENTERS_GLOB_PATTERN,
  PRESENTERS_OUTPUT_FILE,
  PRESENTERS_REGENERATE_COMMAND,
} from '@constants/static-file-constants'
import glob from 'fast-glob'

const files = glob.globSync(PRESENTERS_GLOB_PATTERN)

const imports = files
  .map((file) => {
    const relativePath = path.relative(path.dirname(PRESENTERS_OUTPUT_FILE), file)
    const importPath = relativePath.replace(/\.ts$/, '')

    return `import './${importPath}'`
  })
  .join('\n')

const content = `${PRESENTERS_AUTO_GENERATED_WARNING}\n\n${PRESENTERS_REGENERATE_COMMAND}\n\n${imports}\n`

fs.writeFileSync(PRESENTERS_OUTPUT_FILE, content)
