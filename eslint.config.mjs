import nextConfig from 'eslint-config-next'

const config = [
  ...nextConfig,
  {
    ignores: ['.next/**', 'node_modules/**', 'coverage/**'],
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'react/display-name': 'off',
    },
  },
]

export default config
