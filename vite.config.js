import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@components': path.resolve(__dirname, './src/components'),
            '@static': path.resolve(__dirname, './src/static'),
            '@redux': path.resolve(__dirname, './src/redux'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
              @import "@/styles/_variables.scss";
              @import "@/styles/_mixins.scss";
            `,
            },
        },
    },
})
