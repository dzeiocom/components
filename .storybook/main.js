const path = require("path");
const webpack = require('webpack')

module.exports = {
	"stories": [
		"../src/dzeio/**/*.stories.tsx",
	],
	"addons": [
		"@storybook/addon-essentials"
	],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},
	presets: [path.resolve(__dirname, "./next.js")],
	// Allow to use Next/Image
	webpackFinal: (config) => {
		config.plugins.push(new webpack.DefinePlugin({
			'process.env.__NEXT_IMAGE_OPTS': JSON.stringify({
				deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
				imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
				domains: [],
				path: '/',
				loader: 'default',
			})
		}))
		return config
	}
}
