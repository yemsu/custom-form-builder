import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		tailwindcss(),
		{
			...reactRouter(),
			apply: 'serve'
		},
		,
		tsconfigPaths()
	],
	server: {
		host: '0.0.0.0',
		port: 3000,
		watch: {
			usePolling: true
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts']
	}
})
