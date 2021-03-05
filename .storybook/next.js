module.exports = {
	webpackFinal: async (baseConfig, options) => {
		const { module = {} } = baseConfig;

		const newConfig = {
			...baseConfig,
			module: {
				...module,
				rules: [...(module.rules || [])],
			},
		};

		// TypeScript
		newConfig.module.rules.push({
			test: /\.(ts|tsx)$/,
			// include: [path.resolve(__dirname, '../src/client/components')],
			use: ['babel-loader', 'ts-loader']
		});
		newConfig.resolve.extensions.push('.ts', '.tsx');

		// SCSS
		newConfig.module.rules.push({
		test: /\.styl$/,
		use: ['style-loader', {
			loader: 'css-loader',
			options: {
				url: false,
				importLoaders: 1,
				modules: true
			},
		}, 'stylus-loader'],
	});
		newConfig.resolve.extensions.push('.styl');

		return newConfig;
	},
};
