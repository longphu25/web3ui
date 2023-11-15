import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // process: 'process/browser',
      // buffer: 'buffer',
      // crypto: 'crypto-browserify',
      // stream: 'stream-browserify',
      // assert: 'assert',
      // http: 'stream-http',
      // https: 'https-browserify',
      // os: 'os-browserify',
      // url: 'url',
      // util: 'util',
    },
  },
  plugins: [react(), nodePolyfills()],
})
