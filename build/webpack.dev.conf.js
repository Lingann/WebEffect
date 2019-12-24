const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackConfigDev = {
    mode: 'development',// 通过mode声明开发环境
    output: {
        // publicPath: '../', // 打包后资源文件的引用会基于此路径
        path: path.resolve(__dirname,'../src'),
        publicPath: 'http://127.0.1:9000/',
        // 打包多出口文件
        filename: "script/[id].[hash:8].bundle.js", // 在development模式下,id为name
        chunkFilename: "script/[id].[hash:8].chunk.js"
    },
    devServer: {
        contentBase : path.join(__dirname,"../src"),
        publicPath: '/',
        host: "127.0.0.1",
        port: 9000,
        hot: true,
        overlay: true, // 浏览器页面上显示错误
        open: true, // 开启浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        //服务器代理配置项
        proxy: {
            '/testing/*' : {
                target: '',
                secure: true,
                changeOrigin : true
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.BASE_URL' : '\"' + process.env.BASE_URL + '\"'
        }),
        // // 分离css插件参数为提取出去的路径
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: "source-map"
    // devtool: false
};

module.exports = merge(webpackConfigBase,webpackConfigDev);