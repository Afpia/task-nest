import path from 'node:path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages'),
			'@components': path.resolve(__dirname, './src/components'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@providers': path.resolve(__dirname, './src/providers'),
			'@assets': path.resolve(__dirname, './src/assets')
		}
	}
})
