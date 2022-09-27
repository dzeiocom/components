import path from 'path'
import { defineConfig } from 'vite'
import pkg from './package.json'
import { objectKeys } from '@dzeio/object-util'

const external = objectKeys(pkg.dependencies)

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: './',
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: '@dzeio/components',
			fileName: (format) => `index.${format}.js`
		},
		rollupOptions: {
			// externalize deps that shouldn't be bundled
			// into your library
			external: ['react', 'react-dom', /next/gu, ...external],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: 'React'
				}
			}
		}
	}
})
