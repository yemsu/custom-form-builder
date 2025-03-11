import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const isTestMode = () => {
	return (
		process.env.NODE_ENV === 'test' ||
		process.env.VITEST !== undefined ||
		process.argv.includes('--test')
	)
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		!isTestMode() && reactRouter(),
		tsconfigPaths()
	].filter(Boolean), // false, null, undefined 값 필터링
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
