import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..')

export default defineConfig({
  root: __dirname,
  resolve: {
    preserveSymlinks: false,
    alias: {
      '@calpoly/mustang': resolve(root, 'node_modules/@calpoly/mustang'),
    },
  },
  optimizeDeps: {
    include: ['@calpoly/mustang'],
    force: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",  // Correct port
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:3000",  // Correct port
        changeOrigin: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        consoles: resolve(__dirname, 'consoles.html'),
        genres: resolve(__dirname, 'genres.html'),
        publishers: resolve(__dirname, 'publishers.html'),
        series: resolve(__dirname, 'series.html'),
        players: resolve(__dirname, 'players.html'),
        'zelda-botw': resolve(__dirname, 'zelda-botw.html'),
        'halo-infinite': resolve(__dirname, 'halo-infinite.html'),
        'fifa-24': resolve(__dirname, 'fifa-24.html'),
        'mario-odyssey': resolve(__dirname, 'mario-odyssey.html'),
        'animal-crossing': resolve(__dirname, 'animal-crossing.html'),
        login: resolve(__dirname, 'login.html'),
        newuser: resolve(__dirname, 'newuser.html'),
      },
    },
  },
})