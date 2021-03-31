import typescript from 'rollup-plugin-typescript2';
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
			typescript({useTsconfigDeclarationDir: true}), // so Rollup can convert TypeScript to JavaScript
		],
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				assetFileNames: 'style.css'
			}
		]
	}
];