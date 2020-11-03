const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		{
			name: "@storybook/addon-docs",
			options: {
				configureJSX: true,
			},
		},
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				backgrounds: false,
			},
		},
		"storybook-addon-material-ui",
		{
			name: "@storybook/preset-create-react-app",
			options: {
				craOverrides: {
					fileLoaderExcludes: ["less"],
				},
			},
		},
	],
	webpackFinal: async (config, { configType }) => {
		// `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
		// You can change the configuration based on that.
		// 'PRODUCTION' is used when building the static version of storybook.

		// Make whatever fine-grained changes you need
		config.module.rules.push({
			test: /\.less$/,
			loaders: ["style-loader", "css-loader", {
				loader: "less-loader",
				options: {
					lessOptions: {javascriptEnabled: true}
				}
			}],
			include: path.resolve(__dirname, "../src/"),
		});
		

		// Return the altered config
		return config;
	},
};
