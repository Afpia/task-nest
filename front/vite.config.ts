import path from 'node:path'
import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages'),
			'@app': path.resolve(__dirname, './src/app'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@features': path.resolve(__dirname, './src/features'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@assets': path.resolve(__dirname, './src/app/assets')
		}
	}
})
