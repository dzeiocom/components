import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles'
import pkg from './package.json';

export default [
	{
		input: 'src/index.ts',
		external: ['ms'],
		plugins: [
			styles({
				modules: true,
				url: false,
				autoModules: true,
				mode: 'extract',

			}),
			typescript(), // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{
				dir: './',
				format: 'cjs',
				assetFileNames: 'style.css'
			},
			{
				file: pkg.module,
				format: 'es',
				assetFileNames: 'style.css'
			}
		]
	}
];