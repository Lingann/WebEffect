const path = require('path');
const webpack = require('webpack');

/****************************插件引入*************************************/
// html webpack plugin插件引入
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 清除未引用的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// 拷贝公共资源文件到编译目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/script/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "./"
    },
    module:{
        rules:[]
    },
    externals: {

    },
    resolve:{
        alias:{

        }
    },
    plugins: [
        //使用HTMLWebpack插件
        new HtmlWebpackPlugin({
            title: "页面标题",
            template: "./src/partial/index.ejs",
            filename: "index.ejs"
            // excludeChunks: ['list','detail']
        }),
        // 使用CleanWebpack插件
        new CleanWebpackPlugin(),
        // // 使用cleanWebpack插件
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, './src/public'), // 不打包直接输出的文件
        //         to: 'public', // 打包后静态文件放置位置
        //         ignore: ['.*'] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
        //     }
        // ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        port: 9000,
        // historyApiFallback: true,
        // hot: true,
        inline: true,
        // progress: true
    }
};