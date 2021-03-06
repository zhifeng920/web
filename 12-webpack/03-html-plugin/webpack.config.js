/*
* @Author: Chris
* @Date:   2019-10-20 21:00:11
* @Last Modified by:   Chris
* @Last Modified time: 2019-10-21 11:36:16
*/
const path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
	//指定环境
	mode:'development',
	// mode:'production',
	//单一入口
	// entry:'./src/index.js',
	// entry:{main:'./src/index.js'},
	//多入口
	entry:{
		common:'./src/page/common/index.js',
		index:'./src/page/index/index.js',
	},
	//出口
	output: {
		//「入口分块(entry chunk)」的文件名模版
		// filename:'[name]-[chunkhash]-bundle.js',
		filename:'[name]-[hash]-bundle.js',
		//所有输出文件的目标路径
		path:path.resolve(__dirname,'dist')
	},
	module: {
		rules: [
		//处理css文件
			{
				test:/\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
		//处理图片
			{
				test:/\.(png|jpg|gif)$/i,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 400
						}
					}
				]
			}
		]
	},
	plugins:[
		new CleanWebpackPlugin(),
		new htmlWebpackPlugin({
			template:'./src/view/index.html',//模版文件
			filename:'index.html',//输出的文件名
			inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
			hash:true,//给生成的js/css文件添加一个唯一的hash
			chunks:['common','index']
		})
	],
	devServer: {
		contentBase: './dist',//内容的目录	
		port:8090,//指定服务端口
	},
}























