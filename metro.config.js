/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = (async () => {
	return {
		transformer: {
			getTransformOptions: async () => ({
				transform: {
					experimentalImportSupport: false,
					inlineRequires: true,
				},
			}),
		},
		resolver: {
			sourceExts: [
				'svg',
				'js', // note this has to be defined first or you get an error
				'json',
				'jsx',
				'mjs',
				// required because the react-native cli ignores `resolverMainFields`
				'ts',
				'tsx',
			],
		},
	}
})()
