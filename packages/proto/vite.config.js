import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        consoles: resolve(__dirname, 'public/consoles.html'),
        genres: resolve(__dirname, 'public/genres.html'),
        publishers: resolve(__dirname, 'public/publishers.html'),
        series: resolve(__dirname, 'public/series.html'),
        players: resolve(__dirname, 'public/players.html'),
        'zelda-botw': resolve(__dirname, 'public/zelda-botw.html'),
        'halo-infinite': resolve(__dirname, 'public/halo-infinite.html'),
        'fifa-24': resolve(__dirname, 'public/fifa-24.html'),
        'mario-odyssey': resolve(__dirname, 'public/mario-odyssey.html'),
        'animal-crossing': resolve(__dirname, 'public/animal-crossing.html'),
      },
    },
  },
})
