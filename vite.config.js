import { defineConfig } from 'vite'
// import basicSsl from '@vitejs/plugin-basic-ssl'
// import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  // plugins: [eslintPlugin({ cache: false })],
  // plugins: [basicSsl()],
  optimizeDeps: {
    include: ['video.js', 'videojs-vr'],
  },
  ssr: {
    noExternal: ['video.js', 'videojs-vr'],
  },
  server: {
    // https: true,
    host: '127.0.0.1',
    cors: '*',
    hmr: {
      host: '127.0.0.1',
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
  },
  build: {
    // sourcemap: 'inline',
    sourcemap: true,
    minify: true,
    manifest: true,
    rollupOptions: {
      input: './main.js',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  },
})
