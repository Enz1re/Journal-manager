var webpack = require('webpack');
var path = require('path');
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin')


module.exports = {
	devtool: 'inline-source-map',
	entry: './app/boot.ts',
	output: {
		filename: 'dist/bundle.js'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' }
		]
	},
	plugins: [
		new webpackUglifyJsPlugin({
			cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
			minimize: true,
			sourceMap: false,
			output: {
				comments: false
			}
		})
	]
}