const path = require("path");

module.exports = {
	"stories": [
		"../src/dzeio/**/*.stories.@(js|jsx|ts|tsx)",
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
	presets: [path.resolve(__dirname, "./next.js")]
}
