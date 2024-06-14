import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    server: {
        // port: 3006,
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
