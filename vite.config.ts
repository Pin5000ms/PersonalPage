import fs from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const GITHUB_PAGES_REPOSITORY = 'PersonalPage'

function resolveBasePath() {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH
  }

  // Custom domain deployments on GitHub Pages should serve from the root path.
  if (fs.existsSync('CNAME')) {
    const customDomain = fs.readFileSync('CNAME', 'utf8').trim()

    if (customDomain) {
      return '/'
    }
  }

  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]

  if (repository?.endsWith('.github.io')) {
    return '/'
  }

  return `/${repository ?? GITHUB_PAGES_REPOSITORY}/`
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? resolveBasePath() : '/',
  plugins: [vue()],
}))
