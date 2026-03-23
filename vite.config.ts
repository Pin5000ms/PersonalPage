import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolveBasePath() {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]

  if (!repository || repository.endsWith('.github.io')) {
    return '/'
  }

  return `/${repository}/`
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? resolveBasePath() : '/',
  plugins: [vue()],
}))
