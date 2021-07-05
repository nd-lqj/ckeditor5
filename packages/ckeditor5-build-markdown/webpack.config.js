/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

/* eslint-env node */

const path = require( 'path' );
const webpack = require( 'webpack' );
const { bundler, styles } = require( '@ckeditor/ckeditor5-dev-utils' );
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );
// const { BundleAnalyzerPlugin } = require( 'webpack-bundle-analyzer' );

const minimizer = [];

const plugins = [
	new CKEditorWebpackPlugin( {
		language: 'en',
		additionalLanguages: [ 'zh-cn' ]
	} ),
	new webpack.BannerPlugin( {
		banner: bundler.getLicenseBanner(),
		raw: true
	} )
];

const isDevelopment = ( ( [ key, value ] ) => {
	return key === '--mode' && value === 'development';
} )( process.argv.slice( 2 ) );

if ( !isDevelopment ) {
	// plugins.push( new BundleAnalyzerPlugin( {
	// 	analyzerMode: 'disabled',
	// 	generateStatsFile: true
	// } ) );

	minimizer.push(
		new TerserPlugin( {
			// sourceMap: true,
			terserOptions: {
				output: {
					// Preserve CKEditor 5 license comments.
					comments: /^!/
				}
			},
			extractComments: false
		} )
	);
}

module.exports = [ {
	devtool: isDevelopment ? undefined : 'source-map',
	watch: isDevelopment,
	performance: { hints: false },

	entry: path.resolve( __dirname, 'src', 'ckmd.js' ),

	output: {
		library: 'CKMD',
		path: path.resolve( __dirname, 'build' ),
		filename: 'ckmd.js',
		libraryTarget: 'umd',
		libraryExport: 'default'
	},

	optimization: {
		minimizer
	},

	plugins,

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					}
				]
			}
		]
	}
}, {
	devtool: isDevelopment ? undefined : 'source-map',
	watch: isDevelopment,
	performance: { hints: false },

	entry: path.resolve( __dirname, 'src', 'ckmd.js' ),

	output: {
		path: path.resolve( __dirname, 'lib' ),
		filename: 'ckmd.js',
		libraryTarget: 'commonjs2'
	},

	optimization: {
		minimizer
	},

	plugins,

	module: {
		rules: [
			{
				test: /\.svg$/,
				use: [ 'raw-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
					{
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					}
				]
			}
		]
	}
} ];
