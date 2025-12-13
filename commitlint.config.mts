import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 512],
    'body-leading-blank': [2, 'always'],
    'scope-case': [1, 'always', 'lower-case'],
  },
}

export default Configuration
