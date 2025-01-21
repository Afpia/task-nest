import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@pages': path.resolve(__dirname, './src/pages'),
			'@app': path.resolve(__dirname, './src/app'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@features': path.resolve(__dirname, './src/features'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@assets': path.resolve(__dirname, './src/app/assets')
		}
	}
})
