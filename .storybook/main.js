module.exports = {
	"stories": [
		"../src/**/*.stories.tsx",
	],
	core: {
		builder: "@storybook/builder-vite"
	},
	staticDirs: ["./public"],
	"addons": [
		"@storybook/addon-essentials"
	],
	reactOptions: {
		strictMode: true
	},
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	}
}
