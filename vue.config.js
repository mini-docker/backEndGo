/*
 * @Author: your name
 * @Date: 2019-12-16 10:26:09
 * @LastEditTime: 2019-12-16 12:57:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /redEnvelope-skin/vue.config.js
 */
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
	publicPath: "./",
	assetsDir: "static",
	productionSourceMap: false,
	devServer: {
		port: 8888,
		proxy: {
			"/api": {
				// target: "http://10.18.11.20:7072", //
				target: "http://127.0.0.1:8080", //test
				ws: false,
				changeOrigin: true, //是否跨域
			},
		},
		disableHostCheck: true,
	},
	configureWebpack: (config) => {
		// 开启分离js
		config.optimization = {
			runtimeChunk: "single",
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							warnings: false,
							drop_console: true,
							drop_debugger: true,
							pure_funcs: ["console.log"],
						},
					},
				}),
			],
		};
	},
};