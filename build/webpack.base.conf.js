// 引入nodejs路径模块
const path = require('path');
// 引入webpack
const webpack = require("webpack");

const merge = require('webpack-merge');

// 读取同一目录下的入口配置文件
const ENV_CONFIG =require("./webpack.env.conf");
const RULES_CONFIG = require("./webpack.rules.conf");

/****************************插件引入*************************************/
// html webpack plugin插件引入
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 拷贝公共资源文件到编译目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(RULES_CONFIG,{
    entry: {
        index : path.resolve(__dirname,'../src/script/index.js'),
        about: path.resolve(__dirname,'../src/script/about.js'),
        // contactUs : '../src/contactus.js'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'../src')
        }
    },
    externals: {

    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        // 使用cleanWebpack插件
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/public/static_asset'), // 不打包直接输出的文件
                to: 'public/asset', // 打包后静态文件放置位置
                ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            }
        ]),
        // 使用HTMLWebpack插件
        new HtmlWebpackPlugin({
            title: "页面标题",
            template: path.resolve(__dirname,"../src/index.ejs"),
            filename: "index.html",
            chunks: ['index'],
            inject:true
        }),
        // 使用HTMLWebpack插件
        new HtmlWebpackPlugin({
            title: "关于我们",
            template: path.resolve(__dirname,"../src/about.ejs"),
            filename: "about.html",
            chunks: ['about'],
            inject:true
        }),
    ]
});